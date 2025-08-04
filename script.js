document.getElementById("submitBtn").addEventListener("click", startCountdown);

function startCountdown() {
    const dateStr = document.getElementById("dateInput").value.trim();
    const timeStr = document.getElementById("timeInput").value.trim();

    const [day, month, year] = dateStr.split("/").map(Number);
    const [hour, minute, second] = timeStr.split("/").map(Number);

    const endDate = new Date(year, month - 1, day, hour, minute, second).getTime();
    const startDate = new Date().getTime();

    if (isNaN(endDate) || endDate <= startDate) {
        alert("Invalid date/time or date/time is in the past.");
        return;
    }

    // clear any previous timer
    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
    }

    window.countdownInterval = setInterval(() => {
        updateCountdown(startDate, endDate);
    }, 1000);

    // run immediately once
    updateCountdown(startDate, endDate);
}

function updateCountdown(startDate, endDate) {
    const now = new Date().getTime();

    const distanceCovered = now - startDate;
    const distancePending = endDate - now;

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    const oneSecond = 1000;

    const days = Math.floor(distancePending / oneDay);
    const hrs = Math.floor((distancePending % oneDay) / oneHour);
    const mins = Math.floor((distancePending % oneHour) / oneMinute);
    const secs = Math.floor((distancePending % oneMinute) / oneSecond);

    // update UI
    document.getElementById("days").textContent = days < 10 ? "0" + days : days;
    document.getElementById("hours").textContent = hrs < 10 ? "0" + hrs : hrs;
    document.getElementById("minutes").textContent = mins < 10 ? "0" + mins : mins;
    document.getElementById("seconds").textContent = secs < 10 ? "0" + secs : secs;

    const totalDistance = endDate - startDate;
    const percentage = Math.min(100, (distanceCovered / totalDistance) * 100);

    document.getElementById("progress-bar").style.width = percentage + "%";

    if (distancePending < 0) {
        clearInterval(window.countdownInterval);
        document.getElementById("countdown").innerHTML = "EXPIRED";
        
        document.getElementById("progress-bar").style.width = "100%";
    }
}
