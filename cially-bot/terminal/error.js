function error({ text }) {
    console.log(`[ERROR] `.red + `${text}`);
}

module.exports = { error };