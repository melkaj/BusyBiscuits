
function getBackgroundColors() {
    return {
        sleep: 'rgba(214,82,47,0.80)',
        travel: 'rgba(166,49,224,0.80)',
        exercise: 'rgba(54,140,201,0.8)',
        onPhone: 'rgba(43,224,66,0.8)',
        onComputer: 'rgba(214,190,42,0.8)',
        games: 'rgba(30,61,227,0.8)',
        somethingelse: 'rgba(201,227,27,0.8)'
    }
}

function getBorderColors() {
    return {
        sleep: 'rgba(214,82,47,1)',
        travel: 'rgba(166,49,224,1)',
        exercise: 'rgba(54,140,201,1)',
        onPhone: 'rgba(43,224,66,1)',
        onComputer: 'rgba(214,190,42,1)',
        games: 'rgba(30,61,227,1)',
        somethingelse: 'rgba(201,227,27,1)'
    }
}

module.exports = {
    getBackgroundColors,
    getBorderColors,
}