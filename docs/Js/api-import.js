async function preloadNgrokAPI() {
    return new Promise((resolve) => {
        const iframe = document.getElementById("ngrok-preload");
        iframe.onload = () => {
            console.log("ngrok API preloaded. Now fetching data...");
            resolve();  // Continue once iframe is fully loaded
        };
    });
}

async function fetchJobData(titleId) {
    await preloadNgrokAPI(); 

    try {
        console.log(`Fetching data from: ${apiUrl}`);

        const response = await fetch(apiUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        // Ensure response is valid JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Invalid JSON response (ngrok warning page still active?)");
        }

        const data = await response.json();
        console.log("Fetched Data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("job-classification").textContent = "Failed to load data.";
        return null;
    }
}
