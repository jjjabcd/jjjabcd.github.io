/**
 * Args:
 *   None
 * Returns:
 *   void
 */
(function () {
  "use strict";

  /**
   * Args:
   *   href (string): Link href attribute
   * Returns:
   *   boolean: True if href is mailto link
   */
  function isMailto(href) {
    return typeof href === "string" && href.startsWith("mailto:");
  }

  /**
   * Args:
   *   href (string): Link href attribute
   * Returns:
   *   boolean: True if href is a same-origin or relative link
   */
  function isSameOriginOrRelative(href) {
    if (typeof href !== "string" || href.length === 0) return true;
    if (href.startsWith("#")) return true;
    if (href.startsWith("/")) return true;
    if (href.startsWith("./") || href.startsWith("../")) return true;
    return false;
  }

  /**
   * Args:
   *   urlStr (string): Absolute URL string
   * Returns:
   *   boolean: True if url is same origin
   */
  function isSameOriginAbsolute(urlStr) {
    try {
      var u = new URL(urlStr, window.location.href);
      return u.origin === window.location.origin;
    } catch (e) {
      return true; // Fail-safe: do not force new tab if URL parsing fails
    }
  }

  /**
   * Args:
   *   a (HTMLAnchorElement): Anchor element
   * Returns:
   *   void
   */
  function applyRule(a) {
    var href = a.getAttribute("href");
    if (!href) return;

    // Skip mailto
    if (isMailto(href)) return;

    // Skip non-navigational
    if (href.startsWith("javascript:")) return;

    // Relative/same-origin stays same tab
    if (isSameOriginOrRelative(href)) return;

    // Absolute URL: only open new tab if it is external
    if (href.startsWith("http://") || href.startsWith("https://")) {
      if (isSameOriginAbsolute(href)) return;

      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
  }

  /**
   * Args:
   *   None
   * Returns:
   *   void
   */
  function init() {
    var links = document.querySelectorAll("a[href]");
    for (var i = 0; i < links.length; i += 1) {
      applyRule(links[i]);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
