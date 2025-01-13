fetch('https://cs-club-resume-project.vercel.app/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ visit: true })
})
.then(response => response.json())
.then(data => {
    console.log("Visit counted:", data);
    const trafficDiv = document.getElementById('traffic-data');
    const trafficArray = Object.values(data);
    trafficDiv.innerHTML = `<p>Total website visits: ${trafficArray}</p>`;
})
.catch(error => {
    console.error("Error counting visit:", error);
});
