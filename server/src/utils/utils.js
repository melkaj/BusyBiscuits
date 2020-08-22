
function GetTodaysDate() {
    return new Date().toISOString().slice(0, 10);
}

module.exports = {
    GetTodaysDate,
}