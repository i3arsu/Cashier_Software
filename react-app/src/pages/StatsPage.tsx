const StatsPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          flex: 7,
          height: "92vh",
          backgroundColor: "#FF5733",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 3, backgroundColor: "#1ECBE1" }}>Stat1</div>
        <div style={{ flex: 2, backgroundColor: "#1E6AE1", color: "white" }}>
          Stat2
        </div>
        <div style={{ flex: 2, backgroundColor: "#1EE196" }}>Stat3</div>
      </div>
      <div
        style={{
          flex: 3,
          height: "92vh",
          backgroundColor: "#33DBFF",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, backgroundColor: "#3D28D7", color: "white" }}>
          Chart1
        </div>
        <div style={{ flex: 1, backgroundColor: "#6453DF", color: "white" }}>
          Chart2
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
