const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

const supabase = require('@supabase/supabase-js');
const { createClient } = require('@supabase/supabase-js');

const {wrapAsync} = require('@rimiti/express-async');

const supabasedb = createClient(
  'https://jnbwfumueavwckdncojg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuYndmdW11ZWF2d2NrZG5jb2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIzOTM2NjgsImV4cCI6MTk3Nzk2OTY2OH0.pCVgqLN6sw1ehdur-JhZNYfpv6ZZqU3EGb6U47AloKA'
)

app.get('/', wrapAsync(async function example1(req, res, next) {
  const { data, error } = await supabasedb.from('votes')
  res.status(200).json({ 
    song1_votes: data[0].song_1,
    song1_name: 'coming',
    song1_artist: 'coming',
    song2_votes: data[0].song_2,
    song2_name: 'coming',
    song2_artist: 'coming',
    song3_votes: data[0].song_3,
    song3_name: 'coming',
    song3_artist: 'coming',
  });
}));

app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});