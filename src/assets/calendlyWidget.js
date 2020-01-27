/* eslint-disable */
/*
code is extracted from Calendly's embed script : https://assets.calendly.com/assets/external/widget.js
only the createInlineWidgets() function is taken and modified to work on a passed in DOM node, rather than looking for
a CSS class in the DOM
*/
class Calendly {
  constructor(options = {}) {
    this.options = options;
    this.parseOptions();
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  $_assign (e) {
    'use strict';
    if (e == null) throw new TypeError('Cannot convert undefined or null to object');
    for (var t = Object(e), n = 1; n < arguments.length; n++) {
      var o = arguments[n];
      if (o != null) { for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (t[i] = o[i]); }
    }
    return t;
  }

  /**
   * Filters an object by a set of allowable keys, and returns a new
   * filtered object.
   *
   * @param theObject Object The object to filter
   * @param keys Array The allowable keys
   * @returns {{}} New filtered object
   */
  $_pick (theObject, keys) {
    let i, field, length = keys.length, result = {};
    if (theObject) {
      for (i = 0; i < length; i++) {
        field = keys[i];
        if (theObject[field]) {
          result[field] = theObject[field];
        }
      }
      return result;
    }
  }

  /**
   * Converts the keys of an object from camelCase to snakeCase.
   *
   * @param theObject The object to convert the keys on
   * @returns {{}} New object with converted keys
   */
  $_snakeCaseKeys (theObject) {
    let newKey, oldKey, result;
    result = {};
    for (oldKey in theObject) {
      newKey = oldKey.split(/(?=[A-Z])/).join('_').toLowerCase();
      result[newKey] = theObject[oldKey];
    }
    return result;
  }

  $_stripQuery (url) {
    return url.split('?')[0];
  }

  // build () {
  //   this.node = document.createElement('iframe');
  //   this.node.src = this.getSource();
  //   this.node.width = '100%';
  //   this.node.height = '100%';
  //   return this.node.frameBorder = '0';
  // }

  build () {
    this.node = document.createElement('iframe');
    this.node.src = this.getSource();
    this.node.width = '100%';
    this.node.height = '100%';
    this.node.frameBorder = '0';

    this.node.onload = (e) => {
      this.onIframeLoaded(e);
    };

    return this.node;
  }

  buildSpinner () {
    let spinner;
    spinner = document.createElement('div');
    spinner.className = 'calendly-spinner';
    spinner.appendChild(this.buildBounce(1));
    spinner.appendChild(this.buildBounce(2));
    spinner.appendChild(this.buildBounce(3));
    return spinner;
  }

  // buildSpinner () {
  //   var t;
  //   t = document.createElement("div");
  //   t.className = "spinner";
  //   t.appendChild(this.buildBounce(1));
  //   t.appendChild(this.buildBounce(2));
  //   t.appendChild(this.buildBounce(3));
  //   return t;
  // }

  buildBounce (bounceNum) {
    let bounce = document.createElement('div');
    bounce.className = 'calendly-bounce' + bounceNum;
    return bounce;
  }

  // buildBounce (t) {
  //   var e;
  //   return e = document.createElement("div"), e.className = "bounce" + t, e;
  // }

  /**
   * Extracts the parameters from the query string in a given URL
   *
   * @param url String The URL to extract the query parameters from
   * @returns {{}} Object An object containing key/value pairs of thr extracted
   *                      query params
   */
  extractQueryStringParams (url) {
    let anchor, queryString, queryParams, queryParam, param, paramValue, paramKey, result;
    anchor = document.createElement('a');
    anchor.href = url;
    queryString = anchor.search.substr(1);
    result = {};
    queryParams = queryString.split('&');
    for (let i = 0; i < queryParams.length; i++) {
      queryParam = queryParams[i];
      param = queryParam.split('=');
      paramKey = param[0];
      paramValue = param[1];
      if (paramValue) {
        result[paramKey.toLowerCase()] = decodeURIComponent(paramValue);
      }
    }
    return result;
  }

  filterConsentParam (url) {
    return url.replace(/consent_accept=1&?/g, "");
  }

  format () {
    return this.isMobile ? this.formatMobile() : this.formatDesktop();
  }

  formatDesktop () {
    return this.inlineStyles
      ? this.parent.setAttribute('style', 'position: relative;' + this.parent.getAttribute('style'))
      : void 0;
  }

  formatMobile () {
    return this.inlineStyles
      ? this.parent.setAttribute('style', 'position: relative; overflow-y: auto; -webkit-overflow-scrolling: touch;' + this.parent.getAttribute('style'))
      : this.parent.className += ' calendly-mobile';
  }

  // formatMobile () {
  //   return this.inlineStyles
  //     ? this.parent.setAttribute('style', 'position: relative; overflow-y:auto; -webkit-overflow-scrolling: touch;' + this.parent.getAttribute('style'))
  //     : this.parent.className += ' mobile';
  // }

  getBookingUtmParams () {
    let url = this.getUrl();

    return this.getUtmUrlParams(url);
  }

  getDivider () {
    return -1 === this.getUrl().indexOf('?') ? '?' : '&';
  }

  getDomain () {
    return document.location.host;
  }

  // getDomain () {
  //   return encodeURIComponent(document.location.host);
  // }

  getHostUtmParams () {
    return this.getUtmUrlParams(window.location.href);
  }

  /**
    * Combines all of the params into an array of param strings
    *
    * @returns {string} The array of param strings
    */
  getParams () {
    let allParams, paramKey, paramValue, paramStrings;
    allParams = this.$_assign({
      embed_domain: this.getDomain(),
      embed_type: this.embedType,
    }, this.getUtmParamsFromHost(), this.getParamsFromUrl(), this.getParamsFromOptions());
    paramStrings = [];
    for (paramKey in allParams) {
      paramValue = allParams[paramKey];
      paramStrings.push(paramKey + '=' + encodeURIComponent(paramValue));
    }
    return paramStrings.join('&');
  }

  // getParams() {
  //   var t, e, n, o;
  //   e = "embed_domain=" + this.getDomain() + "&embed_type=" + this.embedType, n = this.getHostUtmParams();
  //   for (t in n) o = n[t], t in this.getBookingUtmParams() || (e += "&" + t + "=" + o);
  //   return e;
  // }

  getParamsFromOptions () {
    return this.$_assign({}, this.getPrefillParams(), this.getUtmParams());
  }

  getParamsFromUrl () {
    return this.extractQueryStringParams(this.url);
  }

  /**
    * Parses the prefill options, converts keys to the desired format, and
    * flattens the any nested objects (e.g. customAnswers).
    *
    * @returns {{}|null} The converted prefill parameters or null if no prefill
    */
  getPrefillParams () {
    let prefillParams, customAnswers, answerKey, answerValue;
    if (!this.options.prefill) return null;
    let keys = ['name', 'firstName', 'lastName', 'email'];
    prefillParams = this.$_snakeCaseKeys(this.$_pick(this.options.prefill, keys));
    if (this.options.prefill.customAnswers) {
      customAnswers = this.options.prefill.customAnswers;
      for (answerKey in customAnswers) {
        answerValue = customAnswers[answerKey];
        if (answerKey.match(/^a\d{1,2}$/)) {
          prefillParams[answerKey] = answerValue;
        }
      }
    }
    return prefillParams;
  }

  getSource () {
    let url = this.$_stripQuery(this.url) + '?' + this.getParams();
    return this.filterConsentParam(url);
  }

  // getSource () {
  //   let source;
  //   let params = this.getParams();
  //   let url = '' + this.getUrl() + this.getDivider() + params;
  //   let src = this.filterConsentParam(url);
  //   return src;
  // }

  getUrl () {
    return null != this.url ? this.url : this.url = this.parent.getAttribute("data-url").split("#")[0];
  }

  getUrlFromParent () {
    return this.parent.getAttribute('data-url');
  }

  getUtmParams () {
    let e = ['utmCampaign', 'utmSource', 'utmMedium', 'utmContent', 'utmTerm'];
    return this.options.utm
      ? this.$_snakeCaseKeys(this.$_pick(this.options.utm, e))
      : null;
  }

  getUrlParams (search = '') {
    search = search.split('?')[1];

    if (!search) return {};

    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
  }

  getUtmParamsFromHost () {
    let utmParams = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_content', 'utm_term'];
    let queryStringParams = this.extractQueryStringParams(window.location.href);
    return this.$_pick(queryStringParams, utmParams);
  }

  getUtmUrlParams (url) {
    return this.getUrlParams(url);
  }

  inject () {
    this.format();
    this.parent.appendChild(this.buildSpinner());
    return this.parent.appendChild(this.node);
  }

  // inject () {
  //   this.parent.appendChild(this.buildSpinner());
  //   this.parent.appendChild(this.node);
  //   return this.format();
  // }

  parseOptions () {
    try {
      this.parent = this.options.parentElement;
      if (this.parent.jquery) {
        this.parent = this.parent[0];
      }
      this.inlineStyles = this.options.inlineStyles || false;
      this.embedType = this.options.embedType || 'Inline';
      this.url = (this.options.url || this.getUrlFromParent()).split('#')[0];
      this.onIframeLoaded = this.options.onLoad || (() => {});
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
      throw (error);
    }
  }
}

export default {
  widget(options = {}) {
    const calendly = new Calendly(options);
    calendly.build();
    calendly.inject();
    return calendly;
  }
}
