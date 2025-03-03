# Lahat: Project Overview

<!-- SUMMARY -->
This document provides a comprehensive overview of the Lahat application, including its purpose, architecture, features, implementation details, and development strategy.
<!-- /SUMMARY -->

<!-- RELATED DOCUMENTS -->
related '../architecture/technical_architecture.md'
related '../architecture/security.md'
related '../development/development_roadmap.md'
related '../user_experience/user_experience.md'
<!-- /RELATED DOCUMENTS -->

## Project Overview

- **Purpose:** Lahat is an Electron application that integrates with Claude to generate mini desktop applications based on user prompts.
- **Goals:** 
  - Enable users to describe applications in natural language and have Claude generate self-contained HTML/CSS/JS files
  - Simplify application creation through natural language descriptions
  - Generate functional, self-contained HTML/CSS/JS applications
  - Provide an intuitive interface for managing generated applications
  - Enable iterative refinement of applications through continued conversation
- **Target Audience:** 
  - Developers looking for rapid prototyping tools
  - Non-technical users who want to create simple applications without coding
  - Educators and students exploring AI-assisted development
  - Professionals who need quick, custom productivity tools

## Technical Architecture

```mermaid
graph TD
    A[Main Electron Process] --> B[Renderer Process]
    A --> C[Claude API Client]
    A --> D[Mini App Window Manager]
    B --> E[User Interface]
    C --> F[Claude API]
    D --> G[Generated Mini Apps]
    E --> H[Prompt Input]
    E --> I[App Gallery]
    H --> J[Generation Request]
    J --> C
    F --> K[HTML/CSS/JS Response]
    K --> D
    D --> L[Electron BrowserWindow]
```

- **Platform:** Electron with JavaScript, HTML, and CSS
- **Design:** 
  - Main application window for prompt input and app management
  - Dynamically created windows for each generated mini app
- **Components:**
  - Claude API Client: Handles communication with Claude AI
  - Mini App Window Manager: Creates and manages Electron windows for generated apps
  - App Storage: Saves generated applications for future use
- **Security:** 
  - Secure IPC communication with contextIsolation
  - Content Security Policy (CSP) for generated applications
  - Sandboxed execution of generated code

For a detailed view of the mini app generation process, see the [Mini App Generation Sequence](../architecture/mini_app_generation_sequence.md) document, which provides a comprehensive sequence diagram and explanation of the entire workflow.

## Current Features

- **API Key Management:**
  - Secure storage of Claude API key
  - Validation of API key on startup

- **Prompt Interface:**
  - Text input area for describing the desired mini application
  - Submit button to send the prompt to Claude
  - Loading indicator during generation

- **App Generation:**
  - Natural language prompt input
  - Real-time streaming of Claude's response
  - Claude processes the prompt and generates a self-contained HTML/CSS/JS file
  - System validates and sanitizes the generated code
  - Automatic creation of mini app windows
  - Storage of generated app code and metadata

- **App Management:**
  - List of previously generated apps
  - Opening, updating, and deleting saved apps
  - Exporting apps as standalone HTML files
  - Ability to launch, edit, or delete saved apps

- **Mini App Windows:**
  - Sandboxed execution environment
  - Native window controls (minimize, maximize, close)
  - Secure IPC communication
  - Option to view source code of the generated app

## Security Architecture

```mermaid
sequenceDiagram
    participant User
    participant MainApp
    participant Claude
    participant AppSandbox
    
    rect rgb(75, 158, 255)
        Note over User,MainApp: Input Validation
        User->>MainApp: Submit App Prompt
        MainApp->>MainApp: Validate Input
    end
    
    rect rgb(102, 187, 106)
        Note over MainApp,Claude: Secure API Communication
        MainApp->>Claude: Send Validated Prompt
        Claude->>MainApp: Return Generated Code
    end
    
    rect rgb(255, 167, 38)
        Note over MainApp,AppSandbox: Code Sanitization
        MainApp->>MainApp: Sanitize Generated Code
        MainApp->>MainApp: Apply CSP Headers
    end
    
    rect rgb(255, 82, 82)
        Note over MainApp,AppSandbox: Sandboxed Execution
        MainApp->>AppSandbox: Load in Isolated Context
        AppSandbox->>User: Display Mini App
    end
```

- **Input Validation:**
  - Sanitize user prompts before sending to Claude
  - Implement rate limiting for API requests
- **Generated Code Security:**
  - Scan generated code for potentially harmful patterns
  - Apply strict Content Security Policy to generated apps
  - Run generated apps in sandboxed BrowserWindows
- **Data Protection:**
  - Encrypt stored app data
  - Implement secure IPC communication between processes
  - Prevent unauthorized access to system resources

For more detailed information on security measures, see the [Security Architecture](../architecture/security.md) document.

## Natural Language Processing Strategy

- **Prompt Engineering:**
  - Design clear instructions for Claude to generate well-structured HTML/CSS/JS
  - Include examples and templates in the system prompt
  - Specify output format requirements

- **Response Processing:**
  - Parse Claude's response to extract HTML, CSS, and JavaScript
  - Handle edge cases and malformed responses
  - Provide feedback to improve future generations

- **Iterative Refinement:**
  - Allow users to refine generated apps through follow-up prompts
  - Maintain conversation context for improvements
  - Learn from successful generations to improve system prompt

For more detailed information on prompt engineering, see the [Prompt Engineering](prompt_engineering.md) document.

## Implementation Status

- **Completed:**
  - Core application architecture
  - Claude API integration
  - Mini app generation and management
  - User interface for app creation and management
  - Security measures for sandboxed execution
  - Window sheets architecture implementation
  - Main.js refactoring into modules
  - 2-step app creation wizard

- **In Progress:**
  - Enhanced error handling and recovery
  - Improved prompt engineering for better app generation
  - Performance optimizations

- **Planned:**
  - Templates and examples for common app types
  - Integration with local LLMs via Ollama
  - Enhanced customization options for generated apps
  - Collaborative features for team environments

For a detailed development roadmap, see the [Development Roadmap](development_roadmap.md) document.

## Development Phases

1. **Foundation (Phase 1)**
   - Basic Electron setup with Claude API integration
   - Simple prompt interface and response handling
   - Minimal viable app generation and display

2. **Core Functionality (Phase 2)**
   - Enhanced prompt engineering for better app generation
   - App storage and management features
   - Improved window management

3. **Refinement (Phase 3)**
   - Security enhancements and code sanitization
   - UI/UX improvements
   - Performance optimization

4. **Advanced Features (Phase 4)**
   - App templates and categories
   - Sharing and export functionality
   - Integration with development workflows

## Security Best Practices

- **For Generated Apps:**
  - Apply strict Content Security Policy
  - Disable potentially dangerous APIs
  - Run in isolated context with limited permissions

- **For Main Application:**
  - Keep contextIsolation enabled and nodeIntegration disabled
  - Validate all user inputs
  - Use secure IPC channels for process communication
  - Regularly audit and update dependencies

- **For API Communication:**
  - Secure API key storage
  - Implement rate limiting
  - Validate responses before processing

## Known Issues & Limitations

- **Potential Challenges:**
  - Claude may generate invalid or incomplete HTML/CSS/JS
  - Security concerns with executing AI-generated code
  - Limited complexity of applications that can be generated

- **Mitigation Strategies:**
  - Implement robust validation and error handling
  - Create fallback templates for common failure cases
  - Provide clear documentation on system limitations

- **Future Considerations:**
  - Integration with more powerful AI models as they become available
  - Support for more complex application types
  - Addition of component libraries to enhance generated apps
