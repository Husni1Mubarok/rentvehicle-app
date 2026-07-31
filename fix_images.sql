-- UPDATE BROKEN IMAGES WITH VALID WORKING UNSPLASH URLS
UPDATE public.vehicle_images SET image_url = CASE 
  WHEN image_url = 'https://images.unsplash.com/photo-1590362891991-f7614d10f607?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'
  WHEN image_url = 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800'
  WHEN image_url = 'https://images.unsplash.com/photo-1629897048514-3dd74142b588?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'
  WHEN image_url = 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=800'
  WHEN image_url = 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800'
  WHEN image_url = 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800'
  WHEN image_url = 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800'
  WHEN image_url = 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1541348263662-e082662d82da?auto=format&fit=crop&q=80&w=800'
  WHEN image_url = 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800'
  WHEN image_url = 'https://images.unsplash.com/photo-1678850604179-c5c8e3cc004e?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=800'
  WHEN image_url = 'https://images.unsplash.com/photo-1622180203374-9524a52b7342?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'
  WHEN image_url = 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800'
  WHEN image_url = 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'
  WHEN image_url = 'https://images.unsplash.com/photo-1534094145710-18e404fc5586?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=800'
  WHEN image_url = 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800'
  WHEN image_url = 'https://images.unsplash.com/photo-1517406169978-e56598c92a6c?auto=format&fit=crop&q=80&w=800' THEN 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800'
  ELSE image_url
END;
