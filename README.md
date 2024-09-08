# Better Prompt Generator

The **Better Prompt Generator** is a Chrome extension designed to improve user-generated prompts using a large language model (LLM). This extension communicates with a server hosted on Render, which leverages GitHub-hosted LLM models to refine and enhance the prompts.

## Features
- Accepts user input in the form of text prompts.
- Sends the input to an LLM server for enhancement.
- Displays the improved prompt directly in the extension interface.
- Provides the option to copy the improved prompt to the clipboard.

## How It Works
1. The user enters a prompt in the extension's popup.
2. The extension sends the prompt to a server hosted on Render.
3. The server processes the prompt using the LLM and returns an improved version.
4. The extension displays the refined prompt, which can be copied with a single click.

## Tech Stack
- **Chrome Extension**: Built with HTML, CSS, and JavaScript.
- **Server**: Node.js server hosted on Render, utilizing GitHub-based LLM models and Azure AI Inference SDK.
- **Azure AI**: Enhances the prompt using the GPT-4o-mini model from Azure AI.

## Installation

### 1. Chrome Extension
1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/your-repo/better-prompt-generator.git
    ```

2. Go to `chrome://extensions` in your Chrome browser.
3. Enable "Developer Mode" in the top right corner.
4. Click on "Load unpacked" and select the folder where you cloned the repository.

### 2. Server Setup
1. Navigate to the `server` directory and install the necessary dependencies:

    ```bash
    cd server
    npm install
    ```

2. Create a `.env` file in the `server` folder and add the following environment variables:

    ```
    GITHUB_TOKEN=your_github_token_here
    PORT=3000
    ```

3. Run the server:

    ```bash
    npm start
    ```

    The server will be running on `http://localhost:3000`.
