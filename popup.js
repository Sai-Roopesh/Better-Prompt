document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generatePrompt");
    const copyButton = document.getElementById("copyButton");

    generateButton.addEventListener("click", async () => {
        const userInput = document.getElementById("userInput").value;
        const output = document.getElementById("output");

        if (userInput.trim() === "") {
            output.textContent = "Please enter some text.";
            return;
        }

        output.textContent = "Generating...";

        try {
            const response = await fetch('https://better-prompt-ashy.vercel.app', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'chrome-extension://epadkibamflmgdggkpbbgndjfpijnoce'
                },
                body: JSON.stringify({ prompt: userInput })
            });

            if (response.ok) {
                const data = await response.json();
                output.textContent = data.improvedPrompt;
            } else {
                output.textContent = "Failed to generate prompt. Status: " + response.status;
            }
        } catch (error) {
            output.textContent = "Error: " + error.message;
            console.error("Full error:", error);
        }
    });

    copyButton.addEventListener("click", () => {
        const outputText = document.getElementById("output").textContent;
        if (outputText) {
            navigator.clipboard.writeText(outputText);
            alert("Copied to clipboard!");
        }
    });
});