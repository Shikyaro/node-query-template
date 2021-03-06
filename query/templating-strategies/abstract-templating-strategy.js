/**
 * @typedef {Object} AdditionOptions
 * @property {String} propertyName
 * @property {*} [propertyValue]
 * @property {String} [delimiter]
 */

/**
 * @class
 * @abstract
 */
class AbstractTemplatingStrategy {
    /**
     * @constructs
     * @param {{openingSequence:String, closingSequence:String}|null} config templating config
     */
    constructor(config = {}) {
        const {openingSequence, closingSequence} = config;
        /**
         * @type {string}
         * @protected
         */
        this._leadingSequence = '';
        this._openingSequence = openingSequence || '{{';
        this._closingSequence = closingSequence || '}}';

        if (new.target === AbstractTemplatingStrategy) {
            throw new TypeError(`Can't create instance of abstract class`);
        }
    }

    /**
     * @returns {string} leading sequence to apply strategy
     */
    getPrefix() {
        return this._leadingSequence;
    }

    /**
     * @param {string} addonText addon text from query
     * @returns {boolean} is this strategy appliable to presented addon
     */
    isStrategyApplicable(addonText) {
        return addonText.slice(0, this._leadingSequence.length) === this._leadingSequence;
    }

    /**
     * @abstract
     * @param {String} query Sql query
     * @param {String} additionName additionName
     * @param {*} propertyValue any
     * @param {String} additionSQL additionSQL
     * @param {AdditionOptions} additionOptions addtionOptions
     * @returns {String} original query with replacedParameter
     */
    applyStrategy(query, {additionName, additionSQL, additionOptions}, propertyValue) {
        throw new TypeError(`This method must be overridden!`);
    }

    /**
     * @param {String} name add name
     * @param {String} query query string
     * @param {String} data string to replace
     * @returns {string} replaced query
     */
    replaceInQuery(name, query, data) {
        return query.replace(`${this._openingSequence}${this._leadingSequence}${name}${this._closingSequence}`, data);
    }
}

module.exports = AbstractTemplatingStrategy;
