# **SQL Joins: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN**  

Joins are used in SQL to **combine rows** from two or more tables based on a related column. They help retrieve meaningful data by merging information stored across different tables.

---

## **1. What is a JOIN in SQL?**  
A `JOIN` connects tables using a **common column** (usually a foreign key).  

📌 **Example Scenario:**  
We have two tables:  
🔹 `employees` – Stores employee details.  
🔹 `departments` – Stores department names.  

| **employees** |  
| employee_id | name   | department_id |  
|-------------|--------|--------------|  
| 1           | Alice  | 101          |  
| 2           | Bob    | 102          |  
| 3           | Carol  | 103          |  
| 4           | David  | NULL         |  

| **departments** |  
| department_id | department_name |  
|--------------|----------------|  
| 101          | HR             |  
| 102          | IT             |  
| 103          | Finance        |  
| 104          | Marketing      |  

Now, let's see how different joins work.  

---

## **2. INNER JOIN (Matches Only Common Records)**  
📌 **Definition**:  
`INNER JOIN` returns **only the matching rows** from both tables. If there is **no match**, the row is excluded.  

🔹 **SQL Query:**  
```sql
SELECT employees.name, departments.department_name  
FROM employees  
INNER JOIN departments ON employees.department_id = departments.department_id;
```

🔹 **Result:**  

| name   | department_name |  
|--------|---------------|  
| Alice  | HR            |  
| Bob    | IT            |  
| Carol  | Finance       |  

💡 **Explanation:**  
- Only employees **with a matching department_id** in both tables are returned.  
- David (employee_id `4`) is **not included** because he has no department (`NULL`).  
- The **Marketing** department is also **not included** because no employees belong to it.  

---

## **3. LEFT JOIN (All Records from Left Table, Matching from Right Table)**  
📌 **Definition**:  
`LEFT JOIN` returns **all rows from the left table** (`employees`) and **matching rows** from the right table (`departments`).  
- If there's **no match**, NULL values are returned for the right table.  

🔹 **SQL Query:**  
```sql
SELECT employees.name, departments.department_name  
FROM employees  
LEFT JOIN departments ON employees.department_id = departments.department_id;
```

🔹 **Result:**  

| name   | department_name |  
|--------|---------------|  
| Alice  | HR            |  
| Bob    | IT            |  
| Carol  | Finance       |  
| David  | NULL          |  

💡 **Explanation:**  
- All employees are included.  
- David **doesn't belong to any department**, so `NULL` is returned.  
- The **Marketing** department is **not included** because no employee belongs to it.  

---

## **4. RIGHT JOIN (All Records from Right Table, Matching from Left Table)**  
📌 **Definition**:  
`RIGHT JOIN` returns **all rows from the right table** (`departments`) and **matching rows** from the left table (`employees`).  
- If there's **no match**, NULL values are returned for the left table.  

🔹 **SQL Query:**  
```sql
SELECT employees.name, departments.department_name  
FROM employees  
RIGHT JOIN departments ON employees.department_id = departments.department_id;
```

🔹 **Result:**  

| name   | department_name |  
|--------|---------------|  
| Alice  | HR            |  
| Bob    | IT            |  
| Carol  | Finance       |  
| NULL   | Marketing     |  

💡 **Explanation:**  
- All departments are included.  
- Since **no employee belongs to the Marketing department**, `NULL` is returned.  
- David is **not included** because he has no department.  

---

## **5. FULL JOIN (All Records from Both Tables, Matches Where Possible)**  
📌 **Definition**:  
`FULL JOIN` returns **all rows from both tables**.  
- If there is **a match**, the records are combined.  
- If there is **no match**, NULL values are returned.  

🔹 **SQL Query:**  
```sql
SELECT employees.name, departments.department_name  
FROM employees  
FULL JOIN departments ON employees.department_id = departments.department_id;
```

🔹 **Result:**  

| name   | department_name |  
|--------|---------------|  
| Alice  | HR            |  
| Bob    | IT            |  
| Carol  | Finance       |  
| David  | NULL          |  
| NULL   | Marketing     |  

💡 **Explanation:**  
- Includes **all employees and all departments**.  
- David is included **even though he has no department** (`NULL`).  
- The **Marketing** department is included **even though it has no employees** (`NULL`).  

---

## **6. Visual Representation of Joins**  

| **Join Type** | **Description** | **Visual** |  
|--------------|---------------|------------|  
| **INNER JOIN** | Only matching rows from both tables. | 🎯 **Intersection** |  
| **LEFT JOIN** | All rows from the left table + matching rows from the right. | 🔄 **Left side full, right side partial** |  
| **RIGHT JOIN** | All rows from the right table + matching rows from the left. | 🔄 **Right side full, left side partial** |  
| **FULL JOIN** | All rows from both tables. | 🌐 **Everything included** |  

---

## **7. When to Use Each JOIN?**  

| **JOIN Type** | **When to Use** |  
|--------------|----------------|  
| **INNER JOIN** | When you only need records **that exist in both tables**. |  
| **LEFT JOIN** | When you need **all rows from the left table**, even if there’s no match in the right. |  
| **RIGHT JOIN** | When you need **all rows from the right table**, even if there’s no match in the left. |  
| **FULL JOIN** | When you need **all data from both tables**, even if there’s no match. |  

---

## **8. Performance Considerations**  
✅ **INNER JOIN is the fastest** because it only retrieves matching records.  
✅ **LEFT JOIN and RIGHT JOIN** are slower when dealing with large datasets.  
✅ **FULL JOIN** can be **resource-intensive** on large tables.  

Would you like **hands-on exercises** to practice these joins? 😊

<hr>

