const asyncErrorHandler = require("../utils/asyncErrorHandler");
const url = process.env.GET_ALL_TRAIN_API;
const token = process.env.API_TOKEN;


const getAllTrains = asyncErrorHandler (async (req,res,next) => {
    
        const {data} = await axios.get(url,{headers:{"Authorization": `Bearer ${token}`}})
        const trains = getTrainWithGreaterDepartureTimes(data);
        const sortedTrains = sortTrainsAccodingToTime(trains);

        res.json({trains:sortedTrains});
})

const getTrainWithGreaterDepartureTimes = (trains) =>{
        const currentTime = new Date();
        const thirtyMinutesLater = new Date( currentTime.getTime() + 30*60000);

        const filteredTrains = trains.filter((train)=>{
            const {Hours,Minutes, Seconds} = train.departureTime;
            const departureTime = new Date(`${currentTime.toLocaleDateString()} ${Hours}:${Minutes}:${Seconds}`)
            return departureTime > thirtyMinutesLater ;
        })

        return filteredTrains;
}

const sortTrainsAccodingToTime = (trains) =>{
    const currentTime = new Date();
    const sortedTrains = trains.sort((a,b) => {

        const departureTimeOfA = new Date(`${currentTime.toLocaleDateString()} ${a.departureTime.Hours}:${a.departureTime.Minutes}:${a.departureTime.Seconds}`)
        const departureTimeOfB = new Date(`${currentTime.toLocaleDateString()} ${b.departureTime.Hours}:${b.departureTime.Minutes}:${b.departureTime.Seconds}`)
        
        return (departureTimeOfA - departureTimeOfB);
    })
    return sortedTrains;
}


module.exports = getAllTrains;