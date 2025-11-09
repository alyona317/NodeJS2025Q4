# CRUD API Testing Instructions

1. Install Dependencies
"npm install"

2. Create a file named .env in the project root.

3. Start the Server "npm run dev". You should see in the terminal:'Server running on port _____'

4. Test it
http://localhost:'port'/api/users
 add newUser like this 
{
    "username":"Alena",
    "age": 21,
    "hobbies": ["dance"]
}
{
    "username":"Kate",
    "age": 31,
    "hobbies": ["sing", "walk"]
}