fetch('http://127.0.0.1:4000/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ visit: true })
})
.then(response => response.json())
.then(data => {
    console.log("Visit counted:", data);
    console.log('Hello');
    const trafficDiv = document.getElementById('traffic-data');
    trafficDiv.innerHTML = `<p>Visit Count: ${data.visits}</p>`;
})
.catch(error => {
    console.error("Error counting visit:", error);
});
