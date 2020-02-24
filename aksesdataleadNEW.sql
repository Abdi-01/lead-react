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
-- truncate tb_cart;

-- ambil stock berdasarkan produk dan ukuran
select p.id,sz.size,sum(s.stock) from tb_products p join tb_stock s
join tb_sizes sz on p.id=s.productID
and sz.id=s.sizeID group by p.id;

-- ambil material
select  p.id, p.name,p.imagepath,m.material,p.description,p.price from tb_products p join tb_materials m
on p.materialID = m.id;

-- ambil data cart user 
select c.id,s.username, p.imagepath, p.name, c.qty, c.price from tb_users s join tb_cart c join tb_products p 
on s.id = c.userID and p.id = c.productID where s.id = 8;  