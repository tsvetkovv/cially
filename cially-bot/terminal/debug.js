function debug({ text }) {
    console.log(`[DEBUG] `.yellow + `${text}`);
}

module.exports = { debug };