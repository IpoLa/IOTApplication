const initialState = {
  lamps:[
    {
      id:1,
      name:"Lamp1",
      is_on: false,
      device_id: 1,
    },
    {
      id:2,
      name:"Lamp2",
      is_on: false,
      device_id: 2,
    },
    {
      id:3,
      name:"Lamp3",
      is_on: false,
      device_id: 3,
    },
    {
      id:4,
      name:"Lamp4",
      is_on: true,
      device_id: 4,
    }
  ],
  tempSensor: [
    {
      "data": 0,
      "device": "Asair",
      "id": 1,
      "chart": [0, 0],
      "direction": 20,
    }
  ],
  bottleSensor: [
    {
      "data": 0,
      "device": "Ultrasonic",
      "id": 2,
    }
  ],
  door: [
    {
      "id": 1,
      "is_on": 0,
    }
  ]
};

const URL = "http://192.168.8.105:8000"

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case "updateLamp":
      const {id, is_on} = action.payload
      const lamp = state.lamps.find((l) => l.id === parseInt(action.payload.id))
      if (lamp) {
        lamp.is_on = action.payload.is_on
      }

      // const URL = 'http://192.168.8.105:8000'
      const path = '/update/led/' + id + '/'
      const postAction = async (path, send) => {
        var request = new FormData()
        request.append('is_on', send ? 1 : 0)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: request
        };
        try {
            await fetch(
                URL + path, requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                          // Alert.alert("Post : ", JSON.stringify(data));
                          console.log("done")
                        });
                })
        }
        catch (error) {
            console.error(error);
        };
      };
      postAction(path, send=is_on);
    return state

    case "getLamp":
      fetch(URL + '/getAllLamps/')
        .then(response => response.json())
        .then(data => {
          // state.lamps.is_on = data.is_on
          // state.lamps.device_id = data.device_id
          state.lamps = data
          console.log("Server : ", data);
          console.log("State :", state.lamps);
        })
        .catch(error => console.error(error));
    return state
      
    case "getTemperature":
      fetch(URL + '/update/sensor/2/')
        .then(response => response.json())
        .then(data => {
          state.tempSensor = data
          console.log("state temp : ", state.tempSensor);
          console.log("data state : ", data);
        })
        .catch (error => console.error(error))
    return state

    case "getBottle":
      fetch(URL + '/update/sensor/1/')
        .then(response => response.json())
        .then(data => {
          state.bottleSensor = data;
          console.log("state temp : ", state.bottleSensor);
          console.log("data state : ", data);
        })
        .catch (error => console.error(error))
    return state

    case "getDoor":
      fetch(URL + '/update/motor/1/')
        .then(response => response.json())
        .then(data => {
          state.door.is_on = data.is_on
          console.log("state door : ", state.door);
          console.log("data state : ", data);
        })
        .catch (error => console.error(error))
    return state

    case "updateDoor":
      // const doorAction = async (action) => {
      //   var request = new FormData()
      //   request.append('is_on', state.door.is_on ? 0 : 1)
      //   const requestOptions = {
      //       method: 'POST',
      //       headers: { 'Content-Type': 'multipart/form-data' },
      //       body: request
      //   };
      //   try {
      //       await fetch(
      //           URL + "/update/motor/1/", requestOptions)
      //           .then(response => {
      //               response.json()
      //                   .then(data => {
      //                     console.log("action data: ", data);
      //                     console.log("action state : ", state.door);
      //                     console.log("action state : ", state.door.is_on);
      //                   });
      //           })
      //   }
      //   catch (error) {
      //       console.error(error);
      //   };
      // };
      // doorAction();
  }
  return state;
};

export default reducer;