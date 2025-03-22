// Simple Script to display prettier terminal messages
function debug({ text }) {
    console.log(`\n[DEBUG] `.yellow + `${text}`);
}

module.exports = { debug };