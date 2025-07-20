# Banking App - Full-Stack Product Management Panel

This is a comprehensive full-stack web application designed to manage financial products within a banking context. The project features a robust **.NET API** backend built with a clean, scalable **CQRS architecture**, and a modern, interactive **React** frontend styled with **Material-UI (MUI)**.

This application serves as a practical demonstration of building enterprise-level software with a clear separation of concerns, ensuring high maintainability and testability.

## ✨ Core Features

-   **Full CRUD Functionality:** Create, read, update, view, and delete financial products.
-   **Advanced Backend Architecture:** Implements the **CQRS (Command Query Responsibility Segregation)** pattern using the **MediatR** library for a clean and decoupled application layer.
-   **Interactive & Component-Based Frontend:** A dynamic user interface built with **React** and **MUI**, featuring reusable components for forms, tables, and navigation.
-   **Rich Data Table:** Includes features like client-side pagination, sorting, and status updates (Active/Passive checkboxes).
-   **Dynamic Filtering:** Users can search and filter the product list by name and code, with search queries handled by the backend.
-   **Modal-Based UX:** All create, update, and view operations are handled in clean, intuitive modal windows.
-   **User Confirmation:** Critical actions like deletion require user confirmation to prevent accidental data loss.
-   **Code-First Database:** The SQL Server database schema is managed entirely through **Entity Framework Core** migrations.

## 🏛️ Architectural Concepts

The backend is built following the **CQRS** pattern, which separates read (`Query`) and write (`Command`) operations. This approach offers several key advantages:

-   **Separation of Concerns:** Controllers are lean, delegating all logic to dedicated handlers.
-   **Scalability:** Read and write models can be optimized independently.
-   **Testability:** Each command and query handler can be unit-tested in isolation.

## 🛠️ Technology Stack

**Backend:**
-   .NET 7
-   ASP.NET Core Web API
-   Entity Framework Core
-   MediatR
-   Microsoft SQL Server

**Frontend:**
-   React
-   TypeScript
-   Material-UI (MUI)
-   React Router for navigation

## 📸 Screenshots

*(Buraya uygulamanın ürün listesi, ekleme modalı gibi ekran görüntülerini eklemen çok etkili olur!)*

<img width="1657" height="398" alt="image" src="https://github.com/user-attachments/assets/5c409a5e-be92-4bf2-8734-5fc209589fb5" />

<img width="601" height="541" alt="image" src="https://github.com/user-attachments/assets/c82655de-dc94-434e-a6a5-9fd5b83c215e" />


## ⚙️ Getting Started

### Prerequisites

-   [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
-   [Node.js and npm](https://nodejs.org/)
-   [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

### 1. Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone (https://github.com/berkehandaglayan/banking-app.git)
    ```
2.  **Navigate to the backend folder:**
    ```bash
    cd ProductAPI
    ```
3.  **Configure the database connection:**
    Open `appsettings.json` and modify the `DefaultConnection` string to point to your SQL Server instance.
4.  **Apply database migrations:**
    Run the following command in the Package Manager Console or .NET CLI:
    ```bash
    dotnet ef database update
    ```
5.  **Run the API:**
    Press `F5` in Visual Studio or use the `dotnet run` command. The API will be available at `http://localhost:5000` (or the port specified in `launchSettings.json`).

### 2. Frontend Setup

1.  **Navigate to the frontend folder:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the application:**
    *Make sure the backend API is running first!*
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.

## 👨‍💻 Author

-   **Berkehan Dağlayan** - github.com/berkehandaglayan
