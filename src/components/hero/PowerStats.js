const PorwerStats = ({ powerStats }) => {
    var powerStatsValue = {
      value:'',
      name:'',
    }
    const namesPowerStat = Object.keys(powerStats);
    const valuesPowerStat = Object.values(powerStats);
    const powerStatsNew = [];

    for (let i = 0; i < valuesPowerStat.length; i++) {
      if(valuesPowerStat[i]==='null') return null;
        powerStatsValue = {
          value: Number(valuesPowerStat[i]),
          name: namesPowerStat[i]
        }
      powerStatsNew.push(powerStatsValue)
    }

    const powerStatsOrder = (powerStatsNew.sort(function(a, b)  { return b.value - a.value } ));
  
    return (
      <>
        {powerStatsOrder.map((powerstat, i) => ( //name.power bla bla
          <div className="progress" 
              style={{
                background:'#0000',
                height: "28px",
                padding: "2px" 
              }} key={i}>
            <div
              className="text-light progress-bar"
              role="progressbar"
              style={{
                background:'#cc0000',
                width: `${powerstat.value}%`,
                margin: "2px 1px ",
              }}
            >
              {`${powerstat.name} ${powerstat.value}%`}
            </div>
          </div>
        ))}
      </>
    );
  };
  
  export default PorwerStats;
  