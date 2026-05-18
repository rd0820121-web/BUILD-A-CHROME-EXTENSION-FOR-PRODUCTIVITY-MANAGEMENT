document.getElementById("reportBtn").addEventListener("click", async () => {
    const response = await fetch("http://localhost:5000/api/activity/report");
    const data = await response.json();
    alert("Today's Productive Time: " + data.productive + " mins");
});
