
// This is the function I wrote to come up with 370 functioning art IDs so I can have one 'art-of-the-day' for each day in the year. 
export async function test_ids() {
  console.log('Test Ids Initiated.');
  const initial_id = 14591;
  const status = {};
  status.Ok = [];
  status.Bad = [];
  let index = 0;
  while (status.Ok.length < 370) {
    let new_id = initial_id + index;
    try {
      const response = await find_art(new_id);
      if (! response) {
        status.Bad.push(new_id);
        
      }
      else {
        status.Ok.push(new_id);
      }
    } catch (error) {
      status.Bad.push(new_id);
    }
    index++
  }
  for (index = 0; index < status.Ok.length; index++) {
    const element = status.Ok[index];
    console.log(element);
    
  }
  console.log(status.Ok.length,'Ids are good', status.Ok);
  ;
}