-- Run this in Supabase SQL Editor if you already have users with empty names
-- It won't break anything for new users

-- Check who has empty names
select id, email, prenom, nom from profiles where prenom = '' or prenom is null;

-- Optional: manually update your own name (replace with your real values)
-- update profiles set prenom = 'VotrePrenom', nom = 'VotreNom' where email = 'votre@email.com';
