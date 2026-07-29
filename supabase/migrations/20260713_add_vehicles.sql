create table vehicles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  location text not null,
  transmission text not null,
  capacity integer not null,
  price_per_day numeric not null,
  rating numeric default 0,
  status text not null default 'available',
  description text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table vehicle_images (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid references vehicles(id) on delete cascade,
  image_url text not null,
  is_primary boolean default false,
  created_at timestamp with time zone default now()
);
