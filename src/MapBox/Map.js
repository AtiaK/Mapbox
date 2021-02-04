import React from "react";
import mapboxgl from "mapbox-gl";
import "./size.css";
import firebase from "./Firebase";
import moment from "moment";
// import ReactDOM from "react-dom";
import { MAPBOX_KEY } from "./MapboxAPIkey";

mapboxgl.accessToken = MAPBOX_KEY;

// const el = document.createElement("div");
// el.className = "marker";
// ReactDOM.render(<div className="marker" />, el);


class Map extends React.Component {
  mapRef = React.createRef();
  map;

  constructor(props) {
    super(props);

    this.unsubscribe = null;
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,
      geodata: [],
      mapStyle: "streets-v11",
      data: null,
    };
    this.handleStyle = this.handleStyle.bind(this);
  }

  componentDidUpdate() {
    this.setstyl();
  }
  setstyl = () => {
    const style = this.state.mapStyle;
    console.log(style);
    this.map.setStyle("mapbox://styles/mapbox/" + style);
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection("youtubeLinks") //GeoData your collection name
      .doc("IjNLTwdUDVxPafFFRABO") //0e992c60-942d-11ea-aa34-4b5c1ed65a32 your document ID
      .get()
      .then((doc) => {
        if (doc.exists) {
          let data = doc.data();

          this.setState({ data: data });
          console.log("Document data:", this.state.data);

          this.state.data.features.forEach((marker) => {
            const c = marker.properties.CreateDate;
            const o = marker.properties.OpenDate;
            // console.log("Doc:", moment(o, "YYYYMMDD").toDate().toDateString());
            new mapboxgl.Marker(this.mapMarker)
              .setLngLat(marker.geometry.coordinates)
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML(
                    "<p>" +
                      marker.properties.Id +
                      "</p>" +
                      "<p>" +
                      marker.properties.Name +
                      "</p>" +
                      "<p>" +
                      marker.properties.OpenStat +
                      "</p>" +
                      "<p>" +
                      marker.properties.MaxJoinNum +
                      "</p>" +
                      "<p>" +
                      marker.properties.MinJoinNum +
                      "</p>" +
                      "<p>" +
                      moment(c, "YYYYMMDD").toDate().toDateString() +
                      "</p>" +
                      "<p>" +
                      moment(o, "YYYYMMDD").toDate().toDateString() +
                      "</p>"
                  )
              )
              .addTo(this.map);
          });
        } else {
          // doc.data() will be undefined in this case
          this.setState({ data: null });
          console.log("No such document!");
        }
      })
      .catch((error) => {
        this.setState({ data: null });
        console.log("Error getting document:", error);
      });

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      //satellite-v9
      //light-v10
      style: "mapbox://styles/mapbox/" + this.state.mapStyle,
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav);

    this.setstyl();
  }

  handleStyle = (e) => {
    // console.log(e.target.value);
    this.setState({
      mapStyle: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <div className="buttonStyle">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-secondary"
              value="streets-v11"
              onClick={(e) => {
                this.handleStyle(e);
              }}
            >
              streets
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              value="satellite-v9"
              onClick={(e) => this.handleStyle(e)}
            >
              satellite
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              value="light-v10"
              onClick={(e) => this.handleStyle(e)}
            >
              Light
            </button>
          </div>
        </div>
        {/* <div ref={(el) => (this.mapMarker = el)} className="marker" /> */}
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

export default Map;
