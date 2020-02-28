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
-- truncate tb_transactions;

-- ambil stock berdasarkan produk dan ukuran
select p.id,sz.size,sum(s.stock) from tb_products p join tb_stock s
join tb_sizes sz on p.id=s.productID
and sz.id=s.sizeID group by p.id;

-- ambil material
select  p.id, p.name,p.imagepath,m.material,p.description,p.price from tb_products p join tb_materials m
on p.materialID = m.id;

-- ambil data cart user 
select c.id,s.username, p.name, p.imagepath, sz.size, c.qty, c.price 
from tb_users s join tb_cart c join tb_products p 
on s.id = c.userID and p.id = c.productID 
join tb_sizes sz join tb_stock st 
on sz.id = st.sizeID and c.id = st.id where s.id = 8;  
SELECT * FROM tb_cart WHERE userID = 8;

-- Pindah baris dari satu tabel ketabel lain
INSERT INTO tb_history ( userID, productID, stockID, qty, price, status, transactionID ) 
SELECT c.userID, c.productID, c.stockID, c.qty, c.price, 'Unpaid', 1 FROM tb_cart c WHERE c.userID = 8;

select u.username, t.* from tb_transactions t join tb_users u on u.id=t.userID;


