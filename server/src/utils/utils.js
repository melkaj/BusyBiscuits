
/**
 * Returns a date formatted properly for SQL insertion
 * @param {String} unformattedDate
 */
function GetSQLDateFormat(unformattedDate) {
    var count = 0;
    var monthdayyear = [];
    var temp = ""
    while (unformattedDate[count] != ',')
    {
        if (unformattedDate[count] != '/')
        {
            temp+=unformattedDate[count];
        }
        else
        {
            monthdayyear.push(temp);
            temp = "";
        }
        count++;
    }
    // Gets the year    
    monthdayyear.push(temp);

    var formattedDate = `${monthdayyear[2]}-${monthdayyear[0]}-${monthdayyear[1]}`;
    return formattedDate;
}

function validateToken (token) {
    // TODO: install JWT and implement token feature
}

module.exports = {
    GetSQLDateFormat,
}