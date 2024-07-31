// script.js

const timezones = [
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
    "Australia/Sydney",
    "America/Los_Angeles",
    "America/Chicago",
    "Europe/Berlin",
    "Europe/Paris",
    "Asia/Kolkata",
    "Asia/Shanghai"
];

document.addEventListener("DOMContentLoaded", () => {
    const baseTimezoneSelect = document.getElementById("timezone");
    const displayTimezoneSelect = document.getElementById("display-timezone");

    timezones.forEach(tz => {
        const option1 = document.createElement("option");
        option1.value = tz;
        option1.textContent = tz;
        baseTimezoneSelect.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = tz;
        option2.textContent = tz;
        displayTimezoneSelect.appendChild(option2);
    });
});

function addTimezone() {
    const displayTimezoneSelect = document.getElementById("display-timezone");
    const selectedTimezone = displayTimezoneSelect.value;
    const timezoneList = document.getElementById("timezone-list");

    const listItem = document.createElement("li");
    listItem.textContent = selectedTimezone;
    listItem.dataset.timezone = selectedTimezone;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => {
        timezoneList.removeChild(listItem);
    };

    listItem.appendChild(removeButton);
    timezoneList.appendChild(listItem);
}

function convertTime() {
    const selectedTime = document.getElementById("time").value;
    const selectedTimezone = document.getElementById("timezone").value;
    const timezoneList = document.getElementById("timezone-list").children;

    if (!selectedTime || !selectedTimezone) {
        alert("Please select both a time and a base timezone.");
        return;
    }

    if (timezoneList.length === 0) {
        alert("Please select at least one timezone to display.");
        return;
    }

    const date = new Date(selectedTime);
    const baseTime = new Date(date.toLocaleString("en-US", { timeZone: selectedTimezone }));
    const convertedTimesDiv = document.getElementById("converted-times");
    convertedTimesDiv.innerHTML = '';

    Array.from(timezoneList).forEach(item => {
        const tz = item.dataset.timezone;
        const convertedTime = new Date(baseTime.toLocaleString("en-US", { timeZone: tz }));
        const timeString = convertedTime.toLocaleString();
        const div = document.createElement("div");
        div.textContent = `${tz}: ${timeString}`;
        convertedTimesDiv.appendChild(div);
    });
}
