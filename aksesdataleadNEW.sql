use `db-lead`;

select * from tb_users;
select * from tb_useraddress;
select * from tb_products;
select * from tb_sizes;
select * from tb_stock;
select * from tb_materials;
select * from tb_categories;
select * from tb_productcat;
select * from tb_cart;
select * from tb_transactions;
select * from tb_history;
-- truncate tb_history;
-- truncate tb_history;

-- get by category
select * from tb_products p join tb_productcat pc on p.id=pc.productID
join tb_categories c on c.id = pc.categoryID where c.category = 'Jersey';

select  p.id, p.name,p.imagepath,m.material,p.description,p.price,
c.category from tb_products p join tb_materials m
on p.materialID = m.id join tb_productcat pc on p.id=pc.productID
join tb_categories c on c.id = pc.categoryID where c.category = 'Jersey';

-- Limit product
select  p.id, p.name,p.imagepath,m.material,p.description,p.price
        from tb_products p join tb_materials m
        on p.materialID = m.id LIMIT 0,5; 

select h.id,h.invoice,h.userID, u.username, p.name, p.imagepath, sz.size, p.price as productPrice,h.qty, h.price from tb_transactions t join tb_history h on t.invoice = h.invoice 
join tb_users u on h.userID = u.id
join tb_products p on h.productID = p.id 
join tb_sizes sz on h.sizeID = sz.id  
join tb_stock st on st.sizeID = h.sizeID and st.productID = h.productID;


-- ambil stock berdasarkan produk dan ukuran
select p.id,sz.size,sum(s.stock) from tb_products p join tb_stock s
join tb_sizes sz on p.id=s.productID
and sz.id=s.sizeID group by p.id;

-- ambil material
select  p.id, p.name,p.imagepath,m.material,p.description,p.price from tb_products p join tb_materials m
on p.materialID = m.id;

-- ambil data cart user SALAH
select c.id,s.username, p.name, p.imagepath, sz.size, c.qty, c.price 
from tb_users s join tb_cart c join tb_products p 
on s.id = c.userID and p.id = c.productID 
join tb_sizes sz join tb_stock st 
on st.id=c.stockID where s.id = 8;  
-- ambil data cart user FIX 
-- cek select u.username,c.*, p.name, sz.size, st.* from tb_cart c join tb_users u on c.userID = u.id
select c.id, u.username, p.name, p.imagepath, sz.size, c.qty,c.price from tb_cart c join tb_users u on c.userID = u.id
join tb_products p on c.productID = p.id 
join tb_sizes sz on c.sizeID = sz.id  
join tb_stock st on st.sizeID = c.sizeID and st.productID = c.productID;
SELECT * FROM tb_cart WHERE userID = 9;

-- Getcart new
select c.id, u.username, p.name, p.imagepath,c.qty,c.price,st.id as stockID,sz.size from tb_cart c join tb_users u on c.userID = u.id
join tb_products p on c.productID = p.id 
join tb_stock st on st.id = c.stockID 
join tb_sizes sz on sz.id = st.sizeID;
SELECT * FROM tb_cart WHERE userID = 9;

-- Pengurangan Stock 
select st.stock,h.qty, (st.stock-h.qty) as newStock from tb_stock st join tb_history h on h.productId = st.productID
join tb_sizes sz on h.sizeID = sz.id and st.sizeID = h.sizeID;

-- pengurangan stock
SET SQL_SAFE_UPDATES=0; -- Mematikan safe update 
update tb_stock set stock=stock-1 where (productID = 1 and sizeID=3);
SET SQL_SAFE_UPDATES=1; -- Menyalakan safe update

-- Pindah baris dari satu tabel ketabel lain
INSERT INTO tb_history ( userID, productID, stockID, qty, price, status, transactionID ) 
SELECT c.userID, c.productID, c.stockID, c.qty, c.price, 'Unpaid', 1 FROM tb_cart c WHERE c.userID = 8;

select u.username, t.* from tb_transactions t join tb_users u on u.id=t.userID;

UPDATE tb_transactions SET status ='Paid' WHERE invoice = 'LEAD_0CAH0B';

SELECT c.id, c.category 
FROM tb_categories c 
LEFT JOIN tb_categories cc ON cc.parentId = c.id
WHERE cc.id IS NULL;

WITH RECURSIVE category_path (id, category, parentId) AS
        (
          SELECT id, category, parentId
            FROM tb_categories
            WHERE id = 3 -- child node
          UNION ALL
          SELECT c.id, c.category, c.parentid
            FROM category_path AS cp JOIN tb_categories AS c
              ON cp.parentId = c.id
        )
        SELECT * FROM category_path;