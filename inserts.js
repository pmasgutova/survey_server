//database initilization
//run this in mongo shell with: load("inserts.js")
/*conn = new Mongo();
db = conn.getDB("moon_db");*/

db.counters.insert({_id:"question_id", seq:0});

function getNextSequence(name) {
   var ret = db.counters.findAndModify(
          {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true
          }
   );

   return ret.seq;
}

db.addUser('nodejs','deployment_nodjs');
db.addUser('observer','observer');

db.questions.insert({_id:1, tag:'#all', type:"radio", section:"A. Demographics", text:"1. What is your gender?", answers:["Male", "Female"]});
db.questions.insert({_id:2, tag:'#all', type:"radio", section:"A. Demographics", text:"2. Select an age category you belong to:", answers:["Under 16", "16-24","25-39","40-64","Over 65"]});
db.questions.insert({_id:3, tag:'#all', type:"radio", section:"A. Demographics", text:"3. Select the highest level of education you have completed or are currently engaged in:", answers:["Primary School","Secondary School", "High School","Further Education: e.g. A Levels","Undergraduate degree","Postgraduate degree"]});
db.questions.insert({_id:4, tag:'#all', type:"radio", setTag:true, section:"A. Demographics", text:"4. What is your occupation?", answers:["I am a student", "I am a professional"]});
db.questions.insert({_id:5, tag:'#all', type:"radio", section:"A. Demographics", text:"5. How would you classify level of your IT background? ", answers:["Beginner","Intermediate", "Upper Intermediate","Expert"]});
db.questions.insert({_id:6, tag:'#all', type:"radio", section:"A. Demographics", text:"6. What is your native written language?  ", answers:["Left-To-Right Latin Alphabet (e.g. English, Spanish, German)", "Left-To-Right Cyrillic Script (e.g. Russian, Serbian, Ukrainian)", "Left-To-Right Abugida Script (e.g. Hindi, Bengali, Thai)","Right-To-Left Abjad Script (e.g. Arabic, Hebrew, Farsi, Urdu)","Top-To-Bottom Logographic (e.g. Chinese, Japanese, Korean)"]});
db.questions.insert({_id:7, tag:'#all', type:"scale", section:"B. Risk perception", text:"7.1. Please assess each scenario of risk on a scale of 1 to 5: \n \n Using Amazon, or eBay to purchase items using a credit card", answers:["1 - negligible", "2 - little", "3 - some", "4 - high", "5 - very high"]});
db.questions.insert({_id:8, tag:'#all', type:"scale", section:"B. Risk perception", text:"7.2. Please assess each scenario of risk on a scale of 1 to 5: \n \n Not updating your applications (e.g. iTunes, Microsoft Office)", answers:["1 - negligible", "2 - little", "3 - some", "4 - high", "5 - very high"]});
db.questions.insert({_id:9, tag:'#all', type:"scale", section:"B. Risk perception", text:"7.3. Please assess each scenario of risk on a scale of 1 to 5: \n \n Using social networking sites (e.g. Facebook, Instagram)", answers:["1 - negligible", "2 - little", "3 - some", "4 - high", "5 - very high"]});
db.questions.insert({_id:10, tag:'#all', type:"scale", section:"B. Risk perception", text:"7.4. Please assess each scenario of risk on a scale of 1 to 5: \n \n Sending credit card details to someone over email, phone, or message.", answers:["1 - negligible", "2 - little", "3 - some", "4 - high", "5 - very high"]});
db.questions.insert({_id:11, tag:'#all', type:"scale", section:"B. Risk perception", text:"7.5. Please assess each scenario of risk on a scale of 1 to 5: \n \n Clicking on a link in an email from an unknown sender", answers:["1 - negligible", "2 - little", "3 - some", "4 - high", "5 - very high"]});
db.questions.insert({_id:12, tag:'#all', type:"scale", section:"B. Risk perception", text:"7.6. Please assess each scenario of risk on a scale of 1 to 5: \n \n Leaving your car unlocked in city centre multi-story car park", answers:["1 - negligible", "2 - little", "3 - some", "4 - high", "5 - very high"]});
db.questions.insert({_id:13, tag:'#all', type:"scale", section:"B. Risk perception", text:"7.7. Please assess each scenario of risk on a scale of 1 to 5: \n \n Living close to a nuclear plant", answers:["1 - negligible", "2 - little", "3 - some", "4 - high", "5 - very high"]});
db.questions.insert({_id:14, tag:'#all', type:"scale", section:"B. Risk perception", text:"7.8. Please assess each scenario of risk on a scale of 1 to 5: \n \n Taking flight from USA to UK", answers:["1 - negligible", "2 - little", "3 - some", "4 - high", "5 - very high"]});
db.questions.insert({_id:15, tag:'#all', type:"scale", section:"B. Risk perception", text:"7.9. Please assess each scenario of risk on a scale of 1 to 5: \n \n Standing on a ladder.", answers:["1 - negligible", "2 - little", "3 - some", "4 - high", "5 - very high"]});
db.questions.insert({_id:16, tag:'#all', type:"scale", section:"B. Risk perception", text:"7.10. Please assess each scenario of risk on a scale of 1 to 5: \n \n Smoking.", answers:["1 - negligible", "2 - little", "3 - some", "4 - high", "5 - very high"]});
db.questions.insert({_id:17, tag:'#4iamaprofessional', type:"scale", section:"C1. Threat scenario for business phone", text:"8.1.1. Please assess each threat scenario on a scale of 1 to 5: \n \n Your business phone is damaged and you lose work, pictures, or data.", answers:["1 - very unlikely", "2 - unlikely", "3 - possible", "4 - likely", "5 - very likely"]});
db.questions.insert({_id:18, tag:'#4iamaprofessional', type:"scale", section:"C1. Threat scenario for business phone", text:"8.1.2. Please assess each threat scenario on a scale of 1 to 5: \n \n Your business phone is stolen.", answers:["1 - very unlikely", "2 - unlikely", "3 - possible", "4 - likely", "5 - very likely"]});
db.questions.insert({_id:19, tag:'#4iamaprofessional', type:"scale", section:"C1. Threat scenario for business phone", text:"8.1.3. Please assess each threat scenario on a scale of 1 to 5: \n \n Someone 'snoops' on your communication whether calls or data accessing (e.g. government, employer).", answers:["1 - very unlikely", "2 - unlikely", "3 - possible", "4 - likely", "5 - very likely"]});
db.questions.insert({_id:20, tag:'#4iamaprofessional', type:"scale", section:"C1. Threat scenario for business phone", text:"8.1.4. Please assess each threat scenario on a scale of 1 to 5: \n \n Your business phone  is hacked into and your identity is stolen.", answers:["1 - very unlikely", "2 - unlikely", "3 - possible", "4 - likely", "5 - very likely"]});
db.questions.insert({_id:21, tag:'#4iamaprofessional', type:"scale", section:"C2. Threat scenario for personal phone", text:"8.2.1. Please assess each threat scenario on a scale of 1 to 5: \n \n Your mobile phone is damaged and you lose work, pictures, or data.", answers:["1 - very unlikely", "2 - unlikely", "3 - possible", "4 - likely", "5 - very likely"]});
db.questions.insert({_id:22, tag:'#4iamaprofessional', type:"scale", section:"C2. Threat scenario for personal phone", text:"8.2.2. Please assess each threat scenario on a scale of 1 to 5: \n \n Your mobile phone is stolen.", answers:["1 - very unlikely", "2 - unlikely", "3 - possible", "4 - likely", "5 - very likely"]});
db.questions.insert({_id:23, tag:'#4iamaprofessional', type:"scale", section:"C2. Threat scenario for personal phone", text:"8.2.3. Please assess each threat scenario on a scale of 1 to 5: \n \n Someone 'snoops' on your communication whether calls or data accessing (e.g. government, employer).", answers:["1 - very unlikely", "2 - unlikely", "3 - possible", "4 - likely", "5 - very likely"]});
db.questions.insert({_id:24, tag:'#4iamaprofessional', type:"scale", section:"C2. Threat scenario for personal phone", text:"8.2.4. Please assess each threat scenario on a scale of 1 to 5: \n \n Your mobile phone  is hacked into and your identity is stolen.", answers:["1 - very unlikely", "2 - unlikely", "3 - possible", "4 - likely", "5 - very likely"]});
db.questions.insert({_id:25, tag:'#4iamastudent', type:"scale", section:"C. Threat scenario for personal phone", text:"8.1.1. Please assess each threat scenario on a scale of 1 to 5: \n \n Your mobile phone is damaged and you lose work, pictures, or data.", answers:["1 - very unlikely", "2 - unlikely", "3 - possible", "4 - likely", "5 - very likely"]});
db.questions.insert({_id:26, tag:'#4iamastudent', type:"scale", section:"C. Threat scenario for personal phone", text:"8.1.2. Please assess each threat scenario on a scale of 1 to 5: \n \n Your mobile phone is stolen.", answers:["1 - very unlikely", "2 - unlikely", "3 - possible", "4 - likely", "5 - very likely"]});
db.questions.insert({_id:27, tag:'#4iamastudent', type:"scale", section:"C. Threat scenario for personal phone", text:"8.1.3. Please assess each threat scenario on a scale of 1 to 5: \n \n Someone 'snoops' on your communication whether calls or data accessing (e.g. government, employer).", answers:["1 - very unlikely", "2 - unlikely", "3 - possible", "4 - likely", "5 - very likely"]});
db.questions.insert({_id:28, tag:'#4iamastudent', type:"scale", section:"C. Threat scenario for personal phone", text:"8.1.4. Please assess each threat scenario on a scale of 1 to 5: \n \n Your mobile phone  is hacked into and your identity is stolen.", answers:["1 - very unlikely", "2 - unlikely", "3 - possible", "4 - likely", "5 - very likely"]});
db.questions.insert({_id:29, tag:'#all', type:"radio", section:"D. Security and Authentication:", text:"9. Do you use a lock for your mobile phone in general (e.g. PIN)?", answers:["Yes", "No"]});
db.questions.insert({_id:30, tag:'#all', type:"radio", section:"D. Security and Authentication:", text:"10. Do you use a lock-screen on your device?", answers:["Yes", "No"]});
db.questions.insert({_id:31, tag:'#all', type:"pattern", section:"D. Security and Authentication:", text:"11.1. Please set a pattern based on your understanding of the level of risk of a mobile phone: \n \n Personal phone", answers:[]});
db.questions.insert({_id:32, tag:'#4iamastudent', type:"radio", section:"D. Security and Authentication:", text:"11.1.1. Have you heard of University guidance for mobile phone security?", answers:["Yes", "No"]});
db.questions.insert({_id:33, tag:'#4iamaprofessional', type:"pattern", section:"D. Security and Authentication:", text:"11.2. Please set a pattern based on your understanding of the level of risk of a mobile phone: \n \n Work phone", answers:[]});
db.questions.insert({_id:34, tag:'#4iamaprofessional', type:"radio", section:"D. Security and Authentication:", text:"11.2.1. For a work phone, have you had any guidance from the business on the security of the pattern lock?", answers:["Yes", "No"]});
db.questions.insert({_id:35, tag:'#all', type:"pattern", section:"D. Security and Authentication:", text:"12. Please enter a pattern which you think is the most secure. ", answers:[]});
db.questions.insert({_id:36, tag:'#all', type:"radio", setTag:true, section:"D. Security and Authentication:", text:"13. Would you modify the pattern?", answers:["Yes", "No"]});
db.questions.insert({_id:37, tag:'#36yes', type:"pattern", section:"D. Security and Authentication:", text:"13.1. Please set a new pattern", answers:[]});