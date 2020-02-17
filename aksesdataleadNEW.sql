use `db-lead`;

select * from tb_users;
select * from tb_useraddress;
select * from tb_products;
select * from tb_sizes;
select * from tb_stock;
select * from tb_materials;
select * from tb_categories;
select * from tb_productcat;

-- ambil stock berdasarkan produk dan ukuran
select p.id,sz.size,sum(s.stock) from tb_products p join tb_stock s
join tb_sizes sz on p.id=s.productID
and sz.id=s.sizeID group by p.id;

-- ambil material
select  p.id, p.name,p.imagepath,m.material,p.description,p.price from tb_products p join tb_materials m
on p.materialID = m.id;