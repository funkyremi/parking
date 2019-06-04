import React from "react";
import "./App.css";
import { Doughnut } from "react-chartjs-2";

const refreshInterval = 30000;
const corsProxy = "https://cors.io/?";
const parkingsUrl =
  "https://data.montpellier3m.fr/api/3/action/package_show?id=90e17b94-989f-4d66-83f4-766d4587bec2";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      parkings: []
    };
  }
  componentDidMount() {
    this.updateData();

    setInterval(() => {
      this.updateData();
    }, refreshInterval);
  }
  updateData() {
    window
      .fetch(`${corsProxy}${parkingsUrl}`)
      .then(res => res.json())
      .then(json => {
        const resources = json.result.resources;
        resources.forEach(res => {
          const name = res.name;
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
                    const oldParkings = this.state.parkings;
                    const index = this.state.parkings.findIndex(
                      p => p.name === name
                    );
                    oldParkings.splice(index, 1, {
                      name,
                      status,
                      free,
                      total
                    });
                    this.setState({
                      parkings: oldParkings
                    });
                  } else {
                    const oldParkings = this.state.parkings;
                    oldParkings.push({
                      name,
                      status,
                      free,
                      total
                    });
                    this.setState({
                      parkings: oldParkings
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
        <div className="container">
          <img src="%PUBLIC_URL%/montpellier-logo.png" alt="Montpellier Parkings" />
          <br/>
          <br/>
          <h1 className="refresh">Parkings Montpellier Métropole</h1>
          <br />
          <br />
          <div className="row">
            {this.state.parkings.map(p => (
              <div className="col-sm-4 col-md-3 margin-bottom" key={p.name}>
                <h4 className={`text-bold ${this.statusStyle(p.status)}`}>
                  {p.name.replace(/Parking\sd?u?\s?/g, '')} ({p.free})
                </h4>
                <Doughnut
                  options={{
                    legend: {
                      display: false
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
                    ],
                    labels: ["Places prises", "Places restantes"]
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
