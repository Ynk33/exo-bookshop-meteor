export const array = {
    /**
     * @param {any[]} array
     * @returns {any[]} Shuffled array
     */
    randomize(array) {
        return array.slice().sort(() => 0.5 - Math.random());
    },

    /**
     * @param {any[]} array
     * @param {number} count
     * @returns {any[]} Array of a fixed number of random elements from the array
     */
    getRandomElementsFrom(array, count) {
        return this.randomize(array).slice(0, count);
    },

    /**
     * @param {any[]} array
     * @param {number} max
     * @returns {any[]} Array of a random number of random elements from the array
     */
    getRandomNumberOfElementFrom(array, max) {
        const count = Math.ceil(Math.random() * max);
        return this.getRandomElementsFrom(array, count);
    },

    /**
     * @param {any[]} array
     * @returns {any} A random element from the array
     */
    getRandomElementFrom(array) {
        return this.getRandomElementsFrom(array, 1)[0];
    },
}