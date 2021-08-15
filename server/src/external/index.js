import request from 'request';


export const GetResources = (travelSolutions = 4,arrivalTime='17:15',from = 'Werdstrasse 21',to = 'Biel/Bienne BSG', callback) => {
    request(`http://transport.opendata.ch/v1/connections?from=${from}&to=${to}&time=${arrivalTime}&limit=${travelSolutions}`,
        {},
        function (err, res, body) {
            if(err) {
                throw new Error('Error handling request.');
            }
            if(res && body) {
                callback(JSON.parse(body).connections.map((el) => {
                    return { duration: el.duration, transfers: el.transfers,  sections: el.sections }
                }));
            }
    })
}
