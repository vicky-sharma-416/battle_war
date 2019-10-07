# battle_war
1. Create one local postgres database as per config credentials
2. Convert battle.csv into json object by https://www.csvjson.com/csv2json or can use direct json object(test_data.json / test_data.csv file)
3. Run command npm install
4. Can perform CRUD operation
5. First call should be http://localhost:8080/battle, it will create battle table and insert data
6. It also support batch insert, you may sent payload as a array of object.
