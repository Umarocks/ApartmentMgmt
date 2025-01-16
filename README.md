# Apartment Leasing Management System (ALMS)

## Inspiration

The idea for ALMS emerged from the need to simplify and automate the complex tasks involved in apartment management. Traditional methods of handling tenant records, leases, complaints, and payments are time-consuming and prone to human error. ALMS addresses these issues by offering a modern, integrated solution.


### This project was part of CSCI 5333 - Data Base Management System  at  UHCL taught by Professor Khondker Shajadul Hasan. This Projects main focus was on Database Design, Management and Manipulation. 
---

## What it does

ALMS centralizes apartment management tasks, providing features to:

- Manage tenant and owner profiles.
- Track lease details and payments.
- Handle complaints with tracking and resolution workflows.
- Allocate parking spaces.
- Provide secure login and role-based access for users.
- Offer dashboards tailored to different user roles (admin, tenant, owner).

  
![](https://files.catbox.moe/4189yx.png)
![](https://files.catbox.moe/kdzkuv.png)




---

## How we built it

1. **Backend:**

   - Developed with **Express.js** for robust and scalable API management.
   - Integrated secure login authentication system using **Passport.js** and added salt based encryption to ensure highest security for users
      ![](https://files.catbox.moe/lx2ei6.png)
   - Utilized **PostgreSQL** for relational data storage and integrity.
   - Implemented role-based access control for data security.

2. **Frontend:**

   - Built with **HTML**, **CSS**, **JavaScript** and **REACT** for interactive user interfaces.
   - Designed a responsive layout for compatibility across devices.

3. **Database Design:**

   - Created a normalized schema in 3NF for efficiency.
   - Designed ER diagrams to visualize relationships and constraints.

4. **Tools and Technologies:**
   - Git for version control.
   - Tools like **Lucidchart** and **draw.io** for database and UML diagrams.
   - Node.js and npm for dependency management.

---

## Challenges we ran into

- During the project, we focused on designing a scalable database while ensuring proper normalization to reduce redundancy and improve efficiency. However, maintaining normalization became particularly challenging towards the end of the project when new features were requested by the TA, requiring changes to the schema. These updates led to complex adjustments to ensure the database maintained its structure and relationships. We also implemented secure role-based access control, ensuring that different levels of users had appropriate access to the system's features. Striking a balance between a user-friendly interface and robust backend functionality was another key goal. Additionally, we worked to maintain referential integrity, handling cascading updates and deletes to ensure the database remained consistent and reliable throughout the project.

---

## Accomplishments that we're proud of

![](https://files.catbox.moe/256gns.png)

- Developed a secure and robust database schema.
- Streamlined complaint management and financial transactions.
- Created an intuitive user interface tailored for different user roles.
- Ensured high data integrity and minimized redundancy.

---


## What's next for ALMS

1. **Mobile Application:** Build a mobile app for enhanced accessibility.
2. **Data Analytics:** Integrate advanced reporting and visualization tools.
3. **Smart Recommendations:** Use AI to suggest optimal apartments to tenants.
4. **Enhanced Security:** Implement features like two-factor authentication.
5. **IoT Integration:** Enable smart device management for apartments.
6. **User Inteface**: Further improve the user interface.

---

### Key Features:


![](https://files.catbox.moe/7uj8e3.png)
![](https://files.catbox.moe/7r1ixh.png)
![](https://files.catbox.moe/ho6om6.png)

- **Tenant Management:** Profile and lease management, payment tracking.
- **Owner Management:** Property and financial tracking.
- **Apartment Management:** Detailed inventory of units, types, and blocks.
- **Complaint Management:** Efficient logging and resolution of tenant complaints.
- **Parking Management:** Allocation and tracking of parking spaces.
- **Access Control:** Role-based secure access for all users.

---

## Technical Components

### Database Design:
![](https://files.catbox.moe/4m30h8.jpg)
![](https://files.catbox.moe/9l0646.png)
- **Relational Schema:** Normalized for optimal performance.
- **ER Diagram:** Visual representation of relationships and constraints.
- **Data Integrity:** Ensured through referential integrity and constraints.

### Backend:

- **Language:** JavaScript.
- **Framework:** Express.js for API management.
- **Database:** PostgreSQL.

### Frontend:

- **Technologies:** HTML, CSS, and JavaScript.
- **Framework:** REACT.

---

## [For more details, refer to the final report in the repository.](https://github.com/Umarocks/ApartmentMgmt/blob/main/Final%20Report.docx.pdf) 
