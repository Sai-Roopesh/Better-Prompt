# Better Prompt Generator

The **Better Prompt Generator** is a Chrome extension designed to enhance user-generated prompts using Azure AI's GPT-4o-mini model. This extension communicates with a server hosted on Render, which leverages Azure AI Inference SDK to refine and improve the prompts.

🚀 [Check it out on the Chrome Web Store](https://chromewebstore.google.com/detail/better-prompt-generator/emaknmacnnchneikdijcgibdldekgapd)

## Features

- 📝 Accepts user input in the form of text prompts
- 🔄 Sends the input to an Azure AI-powered server for enhancement
- 💡 Displays the improved prompt directly in the extension interface
- 📋 Provides the option to copy the improved prompt to the clipboard

## How It Works

1. User enters a prompt in the extension's popup
2. Extension sends the prompt to a server hosted on Render
3. Server processes the prompt using Azure AI's GPT-4o-mini model and returns an improved version
4. Extension displays the refined prompt, which can be copied with a single click

## Tech Stack

- **Chrome Extension**: Built with HTML, CSS, and JavaScript
- **Server**: Node.js server with Express, hosted on Render
- **Azure AI**: Utilizes the GPT-4o-mini model via Azure AI Inference SDK
- **Environment Variables**: Uses dotenv for managing environment variables

## Installation

### 1. Chrome Extension

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-repo/better-prompt-generator.git
   ```
2. Open Google Chrome and navigate to `chrome://extensions`
3. Enable "Developer Mode" in the top right corner
4. Click on "Load unpacked" and select the folder where you cloned the repository

### 2. Server Setup

1. Navigate to the `server` directory and install the necessary dependencies:
   ```bash
   cd server
   npm install
   ```
2. Create a `.env` file in the `server` folder and add the following environment variables:
   ```
   GITHUB_TOKEN=your_azure_ai_key_here
   PORT=3000
   ```
3. Run the server:
   ```bash
   npm start
   ```
   The server will be running on `http://localhost:3000`

## Project Structure

- `manifest.json`: Chrome extension configuration
- `background.js`: Background script for the extension
- `popup.html`: HTML structure for the extension popup
- `popup.js`: JavaScript for handling user interactions in the popup
- `server.js`: Node.js server script for handling prompt improvement requests

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/your-repo/better-prompt-generator/issues) on our GitHub repository.
