import axios from 'axios'

class Api {
  constructor() {
    this.$http = axios.create({
      baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR'
    })
  }

  getAllStations () {
    return this.$http.get(`Station?$select=StationID%2CStationName&$format=JSON`)
  }

  getStationPrice (originStationID, destinationStationID) {
    return this.$http.get(`ODFare/${originStationID}/to/${destinationStationID}?$format=JSON`)
  }
}

export default new Api()
