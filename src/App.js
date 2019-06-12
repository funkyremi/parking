import React from "react";
import "./App.css";
import { Chart, Doughnut } from "react-chartjs-2";
import ReactLoading from "react-loading";
import Pressure from "pressure";

const refreshInterval = 30000;
const corsProxy = "https://cors.io/?";
const parkingsUrl =
  "https://data.montpellier3m.fr/api/3/action/package_show?id=90e17b94-989f-4d66-83f4-766d4587bec2";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      parkings: [],
      openMap: false
    };
  }
  componentWillMount() {
    Chart.pluginService.register({
      beforeDraw: function(chart) {
        if (chart.config.options.elements.center) {
          var ctx = chart.chart.ctx;
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || "Arial";
          var txt = centerConfig.text;
          var color = centerConfig.color || "#000";
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated =
            (sidePadding / 100) * (chart.innerRadius * 2);
          ctx.font = "30px " + fontStyle;
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = chart.innerRadius * 2;
          var fontSizeToUse = Math.min(newFontSize, elementHeight);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });
  }
  componentDidMount() {
    this.updateData();
    setInterval(() => {
      this.updateData();
    }, refreshInterval);
  }
  formatParkingName(parkingName) {
    return parkingName.replace(/Parking\sd?u?\s?/g, "");
  }
  sortParkingsArray(parkingsArray) {
    return parkingsArray.sort((a, b) => {
      if (this.formatParkingName(a.name) < this.formatParkingName(b.name)) {
        return -1;
      }
      if (this.formatParkingName(a.name) > this.formatParkingName(b.name)) {
        return 1;
      }
      return 0;
    });
  }
  getMapLink(locationName) {
    return `http://maps.apple.com/?daddr=${locationName
      .split(" ")
      .filter(Boolean)
      .join("+")}&dirflg=d&t=h`;
  }
  updateData() {
    window
      .fetch(`${corsProxy}${parkingsUrl}`)
      .then(res => res.json())
      .then(json => {
        const resources = json.result.resources;
        resources.forEach(res => {
          const name = res.name;
          const id = res.id;
          if (name && !name.includes(".xml")) {
            window
              .fetch(`${corsProxy}${res.url}`)
              .then(r => r.text())
              .then(str =>
                new window.DOMParser().parseFromString(str, "text/xml")
              )
              .then(data => {
                try {
                  const status = data.getElementsByTagName("Status")[0]
                    .childNodes[0].nodeValue;
                  const free = Number(
                    data.getElementsByTagName("Free")[0].childNodes[0].nodeValue
                  );
                  const total = Number(
                    data.getElementsByTagName("Total")[0].childNodes[0]
                      .nodeValue
                  );
                  if (this.state.parkings.find(p => p.name === name)) {
                    const parkingsArray = this.state.parkings;
                    const index = this.state.parkings.findIndex(
                      p => p.name === name
                    );
                    parkingsArray.splice(index, 1, {
                      id,
                      name,
                      status,
                      free,
                      total
                    });
                    this.setState({
                      parkings: this.sortParkingsArray(parkingsArray)
                    });
                  } else {
                    const parkingsArray = this.state.parkings;
                    parkingsArray.push({
                      id,
                      name,
                      status,
                      free,
                      total
                    });
                    this.setState({
                      parkings: this.sortParkingsArray(parkingsArray)
                    });
                    const elem = document.getElementById(id);
                    const self = this;
                    Pressure.set(elem, {
                      change: function(force, event) {
                        const size = 1 + force / 2;
                        document.getElementById(
                          id
                        ).style.transform = `scale(${size})`;
                        if (force === 1 && !self.state.openMap) {
                          self.setState({
                            openMap: true
                          });
                          console.log(window.location);
                          setTimeout(() => {
                            window.location = self.getMapLink(name);
                          }, 5);
                          document.getElementById(id).style.transform =
                            "scale(1)";
                        }
                      },
                      end: function() {
                        document.getElementById(id).style.transform =
                          "scale(1)";
                        self.setState({
                          openMap: false
                        });
                      }
                    });
                  }
                } catch (e) {}
              });
          }
        });
      });
  }
  statusStyle(status) {
    return status === "Open" ? "text-open" : "text-closed";
  }
  render() {
    return (
      <div className="App">
        <span id="test" className="logo noselect default-cursor">
          MONT
          <img
            src="p.jpg"
            alt="logo"
            className="animated pulse infinite logo-img"
          />
          ELLIER
        </span>
        <div className="container">
          {this.state.parkings.length === 0 && (
            <ReactLoading
              type={"spinningBubbles"}
              color={"#3258a1"}
              className={"preloader"}
              height={"30%"}
              width={"30%"}
            />
          )}
          <div className="row">
            {this.state.parkings.map(p => (
              <div
                className="col-xs-12 col-sm-6 col-md-4 col-xl-3 margin-bottom"
                key={p.id}
              >
                <h5
                  className={`default-cursor noselect text-bold ${this.statusStyle(
                    p.status
                  )}`}
                >
                  {this.formatParkingName(p.name)}
                </h5>
                <div id={p.id}>
                  <Doughnut
                    options={{
                      legend: {
                        display: false
                      },
                      tooltips: {
                        enabled: false
                      },
                      elements: {
                        center: {
                          text: p.free,
                          color: "rgb(75, 192, 192)",
                          fontStyle: "Helvetica",
                          sidePadding: 30
                        }
                      }
                    }}
                    data={{
                      datasets: [
                        {
                          data: [p.total - p.free, p.free],
                          backgroundColor: [
                            "rgb(255, 99, 132)",
                            "rgb(75, 192, 192)"
                          ]
                        }
                      ]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
