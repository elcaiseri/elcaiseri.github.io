/**
 * Analytics JavaScript - Tracking and metrics
 * Islam Kassem - AI Consulting Website
 */

(function () {
    'use strict';

    // Configuration
    const config = {
        debug: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
        sessionTimeout: 30 * 60 * 1000, // 30 minutes
    };

    /**
     * Initialize Analytics
     */
    function initAnalytics() {
        trackPageView();
        initEngagementTracking();
        initScrollDepthTracking();
        initTimeOnPageTracking();
        initOutboundLinkTracking();
    }

    /**
     * Page View Tracking
     */
    function trackPageView() {
        const pageData = {
            page_path: window.location.pathname,
            page_title: document.title,
            page_location: window.location.href,
            referrer: document.referrer
        };

        sendEvent('page_view', pageData);
    }

    /**
     * Engagement Tracking
     */
    function initEngagementTracking() {
        // Track time spent reading
        let engagementStart = Date.now();
        let isEngaged = true;

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                isEngaged = false;
                const timeSpent = Date.now() - engagementStart;
                sendEvent('engagement_end', {
                    time_spent_ms: timeSpent,
                    time_spent_seconds: Math.round(timeSpent / 1000)
                });
            } else {
                isEngaged = true;
                engagementStart = Date.now();
            }
        });

        // Track form field interactions
        const formFields = document.querySelectorAll('input, textarea, select');
        formFields.forEach(field => {
            field.addEventListener('focus', function () {
                sendEvent('form_field_focus', {
                    field_name: this.name || this.id,
                    field_type: this.type
                });
            });
        });
    }

    /**
     * Scroll Depth Tracking
     */
    function initScrollDepthTracking() {
        const milestones = [25, 50, 75, 100];
        const reached = new Set();

        function calculateScrollDepth() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            return Math.round((scrollTop / docHeight) * 100);
        }

        window.addEventListener('scroll', debounce(function () {
            const depth = calculateScrollDepth();

            milestones.forEach(milestone => {
                if (depth >= milestone && !reached.has(milestone)) {
                    reached.add(milestone);
                    sendEvent('scroll_depth', {
                        depth_percentage: milestone,
                        page_path: window.location.pathname
                    });
                }
            });
        }, 250));
    }

    /**
     * Time on Page Tracking
     */
    function initTimeOnPageTracking() {
        const startTime = Date.now();
        const intervals = [30, 60, 120, 300, 600]; // seconds
        const tracked = new Set();

        setInterval(function () {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);

            intervals.forEach(interval => {
                if (timeOnPage >= interval && !tracked.has(interval)) {
                    tracked.add(interval);
                    sendEvent('time_on_page', {
                        seconds: interval,
                        page_path: window.location.pathname
                    });
                }
            });
        }, 10000);

        // Track before leaving
        window.addEventListener('beforeunload', function () {
            const totalTime = Math.round((Date.now() - startTime) / 1000);
            sendEvent('page_exit', {
                total_time_seconds: totalTime,
                page_path: window.location.pathname
            });
        });
    }

    /**
     * Outbound Link Tracking
     */
    function initOutboundLinkTracking() {
        document.addEventListener('click', function (e) {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href) return;

            // Check if it's an outbound link
            try {
                const url = new URL(href, window.location.origin);
                if (url.hostname !== window.location.hostname) {
                    sendEvent('outbound_link_click', {
                        link_url: href,
                        link_text: link.textContent.trim().substring(0, 100),
                        link_domain: url.hostname
                    });
                }
            } catch (e) {
                // Invalid URL, ignore
            }
        });
    }

    /**
     * Send Event to Analytics
     */
    function sendEvent(eventName, eventParams = {}) {
        // Add common parameters
        const params = {
            ...eventParams,
            timestamp: new Date().toISOString(),
            session_id: getSessionId(),
            user_agent: navigator.userAgent,
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`
        };

        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, params);
        }

        // Debug logging
        if (config.debug) {
            console.log(`[Analytics] ${eventName}:`, params);
        }
    }

    /**
     * Session Management
     */
    function getSessionId() {
        let sessionId = sessionStorage.getItem('analytics_session_id');
        let sessionStart = sessionStorage.getItem('analytics_session_start');

        const now = Date.now();

        if (!sessionId || !sessionStart || (now - parseInt(sessionStart) > config.sessionTimeout)) {
            sessionId = generateId();
            sessionStorage.setItem('analytics_session_id', sessionId);
            sessionStorage.setItem('analytics_session_start', now.toString());
        } else {
            // Update session activity
            sessionStorage.setItem('analytics_session_start', now.toString());
        }

        return sessionId;
    }

    function generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Utility Functions
     */
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnalytics);
    } else {
        initAnalytics();
    }

    // Expose for global access if needed
    window.siteAnalytics = {
        trackEvent: sendEvent,
        trackPageView: trackPageView
    };

})();
