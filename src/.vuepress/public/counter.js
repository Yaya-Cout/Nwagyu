window.addEventListener("load", function(){
    // Simple page view counter with no HTTP logs, logging daily page view in CSV file for Grafana plotting
    let request = new XMLHttpRequest()
    request.open('GET', 'https://counter.yann.n1n1.xyz:8080/numworks-nwagyu-website-load', true)
    request.overrideMimeType("text/html");
    request.send()
});