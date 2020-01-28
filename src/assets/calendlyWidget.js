/*
 * This code is inspired by the vue-calendly npm package (https://officert.github.io/vue-calendly/#/home), which was
 * built by extracting code from Calendly's embed script (https://assets.calendly.com/assets/external/widget.js) and
 * abstracting the logic into a class. This code has been refactored for readability and best practices, as well as
 * rewritten to leverage some new features from the Calendly embed script not currently present (as of this writing) in
 * the vue-calendly package, such as passing prefill values and utm information to the constructor.
*/
class Calendly {
  constructor (options = {}) {
    this.options = options;
    this.parseOptions();
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  _assign (target) {
    'use strict';
    if (target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    let targetRef = Object(target);
    for (let i = 1; i < arguments.length; i++) {
      let source = arguments[i];
      if (source !== null) {
        for (let key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            targetRef[key] = source[key];
          }
        }
      }
    }
    return targetRef;
  }

  /**
   * Filters an object by a set of allowable keys, and returns a new
   * filtered object.
   *
   * @param theObject Object The object to filter
   * @param keys Array The allowable keys
   * @returns {{}} New filtered object
   */
  _pick (theObject, keys) {
    let length = keys.length;
    let field;
    let result = {};
    if (theObject) {
      for (let i = 0; i < length; i++) {
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
  _snakeCaseKeys (theObject) {
    let newKey, oldKey, result;
    result = {};
    for (oldKey in theObject) {
      newKey = oldKey.split(/(?=[A-Z])/).join('_').toLowerCase();
      result[newKey] = theObject[oldKey];
    }
    return result;
  }

  _stripQuery (url) {
    return url.split('?')[0];
  }

  build () {
    this.node = document.createElement('iframe');
    this.node.src = this.getSource();
    this.node.width = '100%';
    this.node.height = '100%';
    this.node.style.border = '0';

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

  buildBounce (bounceNum) {
    let bounce = document.createElement('div');
    bounce.className = 'calendly-bounce' + bounceNum;
    return bounce;
  }

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
    return url.replace(/consent_accept=1&?/g, '');
  }

  format () {
    return this.isMobile
      ? this.formatMobile()
      : this.formatDesktop();
  }

  formatDesktop () {
    return this.inlineStyles
      ? this.parent.setAttribute('style',
        'position: relative;' +
        this.parent.getAttribute('style'))
      : void 0;
  }

  formatMobile () {
    if (this.inlineStyles) {
      this.parent.setAttribute('style',
        `
        position: relative;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        ` + this.parent.getAttribute('style'));
    } else {
      this.parent.className += ' calendly-mobile';
    }
  }

  /**
   * Gets the host domain.
   *
   * Though the host URI in most cases will not contain any characters which
   * need encoding, we must account for cases where the host URI contains a
   * port number (e.g. localhost:8080).
   *
   * @returns {string} The host domain
   */
  getDomain () {
    return encodeURIComponent(document.location.host);
  }

  /**
    * Combines all of the params into an array of param strings
    *
    * @returns {string} The array of param strings
    */
  getParams () {
    let allParams, paramKey, paramValue, paramStrings;
    allParams = this._assign({
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

  getParamsFromOptions () {
    return this._assign({}, this.getPrefillParams(), this.getUtmParams());
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
    prefillParams = this._snakeCaseKeys(this._pick(this.options.prefill, keys));
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
    let url = this._stripQuery(this.url) + '?' + this.getParams();
    return this.filterConsentParam(url);
  }

  getUrlFromParent () {
    return this.parent.getAttribute('data-url');
  }

  getUtmParams () {
    let utmCodes = ['utmCampaign', 'utmSource', 'utmMedium', 'utmContent', 'utmTerm'];
    return this.options.utm
      ? this._snakeCaseKeys(this._pick(this.options.utm, utmCodes))
      : null;
  }

  getUtmParamsFromHost () {
    let utmCodes = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_content', 'utm_term'];
    let queryStringParams = this.extractQueryStringParams(window.location.href);
    return this._pick(queryStringParams, utmCodes);
  }

  inject () {
    this.format();
    this.parent.appendChild(this.buildSpinner());
    return this.parent.appendChild(this.node);
  }

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
  widget (options = {}) {
    const calendly = new Calendly(options);
    calendly.build();
    calendly.inject();
    return calendly;
  },
};
