import React, { createContext, useContext, useState, useEffect } from 'react';

// Assets import for default datasets
import banner1Img from '../assets/banner1-.jpeg';
import banner2Img from '../assets/banner2-.jpeg';
import banner3Img from '../assets/banner3.jpeg';
import banner4Img from '../assets/banner4.jpeg';
import drDewanshImg from '../assets/dr-dewansh-mishra.jpeg';
import strokeImg from '../assets/Patient-Stories/Brain-Stroke-100kb.jpeg';
import aneurysmImg from '../assets/Patient-Stories/Brain aneurysm-100kb.jpeg';
import avmImg from '../assets/Brain_AVM.png';

const galleryModules = import.meta.glob('../assets/gallary/*.jpeg', { eager: true, import: 'default' });

const INITIAL_GALLERY_IMAGES = Object.keys(galleryModules).map((path, index) => {
  const filename = path.split('/').pop();
  return {
    id: `gallery-${index + 1}`,
    url: galleryModules[path],
    title: `Clinical Photo ${index + 1}`,
    filename: filename
  };
});

const DataContext = createContext();

const INITIAL_SITE_INFO = {
  doctorName: "Dr Dewansh Mishra",
  doctorTitle: "Brain & Spine Vascular Specialist",
  doctorQual: "DM Neuroradiology (SCTIMST), MD, MBBS",
  doctorAffiliation: "An Institution of National Importance (INI) Under GOI",
  doctorPhoto: drDewanshImg,
  experienceYears: "8+ Years",
  hospitalName: "Apollomedics Super Speciality Hospital",
  hospitalAddress: "Apollomedics Super Speciality Hospital, KBC-31, Sector B, LDA Colony, Kanpur - Lucknow Rd, Lucknow, Uttar Pradesh 226012",
  city: "Lucknow",
  phone: "092084 30808",
  emergencyPhone: "084290 21960",
  email: "dewanshmishra@gmail.com",
  consultationFee: 500,
  hoursMonSat: "Offline: 10:00 AM - 05:00 PM | Online: 11:00 AM - 07:00 PM",
  hoursOffline: "10:00 AM - 05:00 PM",
  hoursOnline: "11:00 AM - 07:00 PM"
};

const INITIAL_HERO_SLIDES = [
  { id: 'slide-1', isBannerOnly: true, title: "Banner 1", imageUrl: banner1Img },
  { id: 'slide-2', isBannerOnly: true, title: "Banner 2", imageUrl: banner2Img },
  { id: 'slide-3', isBannerOnly: true, title: "Banner 3", imageUrl: banner3Img },
  { id: 'slide-4', isBannerOnly: true, title: "Banner 4", imageUrl: banner4Img }
];

const INITIAL_TREATMENTS = [
  {
    id: 'aneurysm',
    title: 'Aneurysm Coiling / SAC / FD',
    category: 'Aneurysm',
    shortDesc: 'Advanced micro-coiling, Stent-Assisted Coiling (SAC), and Flow Diverter (FD) stenting to prevent & treat brain aneurysm ruptures.',
    symptoms: ['Sudden, extremely severe headache ("thunderclap")', 'Double vision or dilated pupil', 'Pain behind or above one eye', 'Cranial nerve palsies'],
    procedure: 'Endovascular Micro-Coiling & Flow Diversion',
    details: 'Navigating specialized microcatheters into the cerebral aneurysm sac, ultra-soft platinum coils are deployed to seal the aneurysm. For wide-necked aneurysms, Stent-Assisted Coiling (SAC) or Flow Diverter (FD) stents are deployed to redirect arterial blood flow away from the bulge, promoting thrombosis without open brain surgery.',
    color: '#06b6d4',
    iconType: 'Activity',
    features: ['No Skull Surgery', '3-Day Discharge', 'Platinum Coil Sealing']
  },
  {
    id: 'thrombectomy',
    title: 'Mechanical Thrombectomy in Brain Stroke',
    category: 'Emergency Stroke',
    shortDesc: 'Emergency endovascular procedure to physically extract blood clots from occluded brain arteries and prevent stroke disability.',
    symptoms: ['Sudden weakness or numbness in face, arm, or leg', 'Sudden difficulty speaking or slurred speech', 'Loss of balance, severe dizziness, or confusion'],
    procedure: 'Acute Mechanical Thrombectomy',
    details: 'Using microcatheters inserted via femoral or radial access, a stent retriever or aspiration catheter is guided directly to the blocked cerebral artery under real-time fluoroscopy. The blood clot is captured and removed, instantly restoring vital blood flow to ischemic brain tissue.',
    color: '#e11d48',
    iconType: 'Zap',
    features: ['24x7 Emergency Cath Lab', 'Minimally Invasive Pinhole', 'Fast Brain Recovery']
  },
  {
    id: 'dsa',
    title: 'DSA / Angiography',
    category: 'Diagnostics',
    shortDesc: 'Gold-standard Diagnostic Digital Subtraction Angiography for micro-precise visualization of cerebral and spinal blood vessels.',
    symptoms: ['Suspected arterial blockages or stenosis', 'Vascular malformation evaluation', 'Pre-surgical vascular mapping', 'Unexplained intracranial hemorrhage'],
    procedure: 'Cerebral & Spinal Digital Subtraction Angiography',
    details: 'DSA is the definitive gold standard for vascular diagnosis. A flexible catheter introduces radiopaque contrast dye into targeted head and neck arteries. High-definition 3D rotational imaging captures vessel architecture with sub-millimeter precision, pinpointing aneurysms, stenoses, and fistulas.',
    color: '#10b981',
    iconType: 'Scan',
    features: ['Sub-millimeter Precision', '3D Rotational Angio', 'Day-care Procedure']
  },
  {
    id: 'avm',
    title: 'AVM / DAVF Embolization',
    category: 'Vascular Malformation',
    shortDesc: 'Targeted endovascular occlusion of Arteriovenous Malformations (AVM) and Dural Arteriovenous Fistulas (DAVF) using liquid embolic agents.',
    symptoms: ['Seizures or focal neurological deficits', 'Pulsatile tinnitus (whooshing noise in ears)', 'Chronic localized head or spinal pain', 'Sudden intracranial bleeding'],
    procedure: 'Transcatheter Liquid Embolization (Onyx / Glue)',
    details: 'AVMs and DAVFs are high-flow vascular short-circuits. Ultra-thin microcatheters are super-selectively navigated into feeding vessels to inject non-adhesive liquid embolic agents (such as Onyx, Squid, or Glue), effectively plugging the malformation nidus or fistulous connection.',
    color: '#3b82f6',
    iconType: 'ShieldAlert',
    features: ['Super-selective Microcatheter', 'Preserves Normal Brain', 'Non-surgical']
  },
  {
    id: 'neuroreview',
    title: 'Diagnostic Neuroimaging Consultation (Neuroreview)',
    category: 'Neuroreview',
    shortDesc: 'Subspecialty expert second opinion and comprehensive review of Brain/Spine MRI, CT, and vessel imaging scans.',
    symptoms: ['Complex or inconclusive MRI/CT findings', 'Persistent unexplained neurological symptoms', 'Pre-treatment surgical evaluation', 'Second opinion request'],
    procedure: 'Subspecialty Neuroimaging & Multi-Modality Scans Review',
    details: 'Expert neuroradiological consultation analyzing high-resolution MRI sequences (DWI, PWI, MRA/MRV), CT angiograms, and diagnostic scans. Delivers precise diagnostic clarity, detailed report interpretations, and personalized treatment recommendations.',
    color: '#8b5cf6',
    iconType: 'FileSearch',
    features: ['Expert Second Opinion', 'Detailed Scan Analysis', 'Clear Action Plan']
  }
];

const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: 'Pranjali Joshi',
    relation: 'Patient',
    treatment: 'Neuro-Interventional Consultation',
    text: 'Dr Dewansh is very knowledgeable and truly concerned for his patient\'s welfare. He gives time to his patients with a detailed and thorough evaluation of their symptoms. With excellent interventional expertise, he offers genuine counselling and care. Very few people go out of their way for a patients\' welfare, Dr. Dewansh is one of those. Do not think twice before consulting him for any neurological opinion and intervention. Highly recommended!',
    stars: 5,
    date: '8 months ago',
    image: ''
  },
  {
    id: 2,
    name: 'Ankush Srivastava',
    relation: "Patient's Family",
    treatment: 'Brain Aneurysm & Neurovascular Intervention',
    text: 'Dr. Dewansh Mishra is truly a wonderful doctor. His expertise in Brain aneurysm treatment and Neurovascular intervention is exceptional. He is calm, compassionate, and explains every detail with patience, giving patients and families great confidence. Thanks to his timely treatment and dedicated care, my mother is recovering very well. We are deeply grateful and highly recommend him to anyone seeking expert neurovascular care.',
    stars: 5,
    date: '2 months ago',
    image: ''
  },
  {
    id: 3,
    name: 'Gopi Krishan Agrahari',
    relation: 'Patient',
    treatment: 'Neurological Treatment & Care',
    text: 'A huge thank you to Dr. Devansh Mishra & his team for his perfect treatment and kindness. It is rare to find a doctor who combines such high-level expertise with a truly gentle and humble personality. He looks after his patients like family, ensuring every concern is addressed with patience. I felt completely safe and well-cared for under his supervision.',
    stars: 5,
    date: '8 months ago',
    image: ''
  }
];

const INITIAL_STORIES = [
  {
    id: 'brain-stroke-18h',
    category: 'Brain Stroke',
    categoryTag: 'Emergency Thrombectomy',
    badgeColor: '#e11d48',
    title: '18 Hours After Stroke: When It Still Wasn’t Too Late',
    subtitle: 'She came 18 hours after having a brain stroke...',
    summary: 'A 56-year-old woman developed sudden right-sided paralysis and speech loss. Despite 18 hours passing, advanced MRI revealed salvageable brain tissue. Emergency mechanical thrombectomy restored her blood flow, leading to full recovery.',
    image: strokeImg,
    timeframe: '18 Hours Post-Stroke',
    outcome: 'Full Functional Recovery',
    sections: [
      {
        heading: 'A Sudden Stroke & Lost Hours',
        content: `It had already been almost 18 hours since the stroke began. A 56-year-old woman suddenly developed weakness on the right side of her body and difficulty speaking. Like many stroke patients, her family first took her to different outpatient clinics and smaller hospitals. Tests were done, medicines were given, and precious time passed. By the time she reached our emergency department, nearly 18 hours had gone by. For a stroke, that can feel like an eternity.`
      },
      {
        heading: 'Every Minute Matters—But Every Brain Is Different',
        content: `As soon as she arrived, our CODE FAST stroke pathway was activated. She was immediately evaluated and underwent an MRI-based stroke assessment. The scan showed something important: a major artery supplying her brain was blocked by a blood clot. Part of her brain had already suffered irreversible injury. But, remarkably, a much larger area was still receiving reduced blood flow and was at risk of permanent damage. This distinction was crucial. Although many hours had passed, there was still potentially viable brain tissue that could be saved. So we decided to attempt an emergency mechanical thrombectomy.`
      },
      {
        heading: 'Going After the Clot',
        content: `The patient was taken directly to the catheterisation laboratory. Instead of opening the skull, we made a small puncture in the femoral artery in the groin and carefully guided a thin microcatheter through the blood vessels all the way up to the arteries of the brain. Angiography confirmed the blockage. We then used a stent retriever along with aspiration to engage and remove the clot. And then came the moment we were hoping for—the blocked artery opened. Blood flow was restored to the brain. The procedure was completed, and she was shifted to the ICU for close monitoring.`
      },
      {
        heading: 'The Next Morning Brought an Unexpected Answer',
        content: `How much of her brain could we save? The next morning brought an unexpected answer. The change was remarkable. The next day, she was speaking and moving her limbs. The woman who had arrived unable to speak properly and with significant weakness was already showing substantial recovery. Over the next couple of days, her improvement continued. By the time of discharge, she had no significant neurological deficit and was back to her normal activities.\n\nFor her family, it was difficult to believe how dramatically things had changed in just a few days.`
      },
      {
        heading: 'What This Teaches Us About Stroke Care',
        content: `This case highlights one of the most important advances in modern stroke treatment. In an acute ischemic stroke, a blood clot can suddenly block an artery supplying the brain. Without blood flow, brain tissue begins to get damaged. Mechanical thrombectomy allows us to physically remove that clot and restore blood flow.\n\nBut there is another important lesson: a patient who arrives late should not automatically be considered untreatable. Some patients continue to have a significant amount of salvageable brain tissue even many hours after their symptoms begin. Advanced brain imaging can help doctors identify these patients.`
      }
    ],
    emergencyWarning: {
      title: 'The Message Every Family Must Remember',
      points: [
        'Weakness or numbness of the face, arm, or leg—especially on one side',
        'Difficulty speaking or understanding speech',
        'Sudden loss of balance or coordination',
        'Sudden severe neurological symptoms'
      ],
      note: 'Do not wait. Do not visit multiple clinics. Get the patient to a hospital capable of providing 24×7 stroke evaluation and mechanical thrombectomy immediately. Because in stroke, every minute means brain saved.'
    }
  },
  {
    id: 'brain-aneurysm-coiling',
    category: 'Brain Aneurysm',
    categoryTag: 'Keyhole Endovascular Coiling',
    badgeColor: '#06b6d4',
    title: 'Sudden Thunderclap Headache: Emergency Coiling Saved His Life',
    subtitle: 'He had the worst headache of his life requiring urgent endovascular treatment...',
    summary: 'A 48-year-old male suffered a sudden, unbearable thunderclap headache caused by a ruptured cerebral aneurysm. Through a groin catheter, ultra-soft platinum micro-coils sealed the aneurysm without opening the skull.',
    image: aneurysmImg,
    timeframe: 'Emergency Cath Lab Intervention',
    outcome: 'Aneurysm Sealed Safely',
    sections: [
      {
        heading: 'The Sudden Thunderclap',
        content: `While at work, a 48-year-old man experienced an instantaneous, catastrophic headache that he described as "unlike anything ever felt before." Accompanying nausea and neck stiffness prompted immediate hospital transfer, where a 3D CT Angiogram identified a ruptured brain aneurysm at the anterior communicating artery.`
      },
      {
        heading: 'Minimally Invasive Platinum Coiling',
        content: `Rather than performing traditional open-skull craniotomy, Dr. Dewansh Mishra performed emergency endovascular coiling. A microcatheter navigated through the femoral artery into the brain's circulation. Detachable platinum coils were packed tightly inside the aneurysm dome, completely sealing it off from blood pressure.`
      },
      {
        heading: 'Complete Recovery',
        content: `The procedure successfully prevented re-bleeding. The patient recovered smoothly in the Neuro-ICU and was discharged within 5 days with zero neurological deficits.`
      }
    ]
  },
  {
    id: 'brain-avm-embolization',
    category: 'Brain AVM',
    categoryTag: 'Liquid Embolization',
    badgeColor: '#8b5cf6',
    title: 'Unexpected ICU Emergency: Tackling a Complex Brain AVM',
    subtitle: 'She never thought her regular coaching class would end up in ICU...',
    summary: 'A young student collapsed during class due to a bleeding Arteriovenous Malformation (AVM). Targeted micro-catheter liquid embolization completely shut down the abnormal vessel tangle.',
    image: avmImg,
    timeframe: 'Multi-Stage Targeted Care',
    outcome: 'Successful AVM Obliteration',
    sections: [
      {
        heading: 'Sudden Collapse & Diagnosis',
        content: `A 22-year-old student collapsed during her coaching class following a focal seizure. Emergency neuro-imaging revealed a Spetzler-Martin Grade II arteriovenous malformation (AVM) with early venous drainage in her left parietal lobe.`
      },
      {
        heading: 'Precision Liquid Embolization',
        content: `Using advanced biplane digital subtraction angiography (DSA), microcatheters super-selectively cannulated the AVM feeder arteries. Onyx liquid embolic agent was infused with sub-millimeter control, completely closing the malformation without open brain surgery.`
      },
      {
        heading: 'Back to Studies & Normal Life',
        content: `Post-procedure imaging confirmed total obliteration of the AVM nidus. She returned to her academic studies seizure-free and fully recovered.`
      }
    ]
  }
];

const INITIAL_BLOGS = [
  {
    id: 1,
    slug: 'understanding-brain-aneurysms-keyhole-coiling',
    title: 'Understanding Brain Aneurysms & Keyhole Coiling Treatment',
    category: 'Brain Aneurysm',
    readTime: '5 min read',
    date: 'September 24, 2026',
    author: 'Dr. Dewansh Mishra',
    authorRole: 'DM, Neurointervention (SCTIMST)',
    summary: 'An essential guide on early warning signs of brain aneurysms, unruptured versus ruptured risks, and how pinhole endovascular coiling repairs blood vessels without open skull surgery.',
    content: [
      {
        type: 'paragraph',
        text: 'A brain aneurysm is a weak, bulging spot in the wall of a cerebral artery, much like a thin balloon forming on a tire inner tube. Because arterial blood flows under high pressure, this ballooned area is vulnerable to expanding or rupturing over time.'
      },
      {
        type: 'heading',
        text: 'Early Warning Signs & The "Thunderclap" Headache'
      },
      {
        type: 'paragraph',
        text: 'Unruptured aneurysms often remain silent until detected during routine brain imaging. However, large aneurysms may cause localized pressure symptoms such as persistent pain behind one eye, sudden double vision, or pupil dilation. If an aneurysm ruptures, it produces a sudden, excruciating headache commonly described by patients as "the worst headache of my life" (thunderclap headache), often accompanied by nausea, neck stiffness, and loss of consciousness.'
      },
      {
        type: 'highlight',
        text: 'Medical Precaution: A sudden, severe headache that reaches maximum intensity within seconds requires immediate emergency evaluation at a facility with dedicated neuro-interventional care.'
      },
      {
        type: 'heading',
        text: 'How Endovascular Coiling Works'
      },
      {
        type: 'paragraph',
        text: 'Historically, treating a brain aneurysm required open surgical clipping involving a craniotomy. Today, with advanced Neuro-Interventional Radiology (INR), we can treat the vast majority of aneurysms from inside the blood vessel using keyhole endovascular techniques.'
      },
      {
        type: 'paragraph',
        text: 'Through a microscopic pinhole incision in the wrist or groin artery, a microcatheter is navigated up to the brain under high-resolution DSA guidance. Ultra-fine platinum coils are then carefully packed inside the aneurysm sac. This stops blood flow into the aneurysm, causing it to seal safely and preventing future rupture.'
      },
      {
        type: 'heading',
        text: 'Benefits & Patient Recovery'
      },
      {
        type: 'list',
        items: [
          'No open skull incision or stitches on the head',
          'Significantly shorter hospital stay (typically 2 to 3 days)',
          'Minimal post-procedure pain and quick return to routine activities',
          'High long-term occlusion success rate verified by follow-up angiography'
        ]
      },
      {
        type: 'paragraph',
        text: 'If you or a family member have been diagnosed with an unruptured cerebral aneurysm or have a family history of vascular malformations, timely evaluation with Digital Subtraction Angiography (DSA) can help determine the safest preventive approach.'
      }
    ]
  },
  {
    id: 2,
    slug: 'mechanical-thrombectomy-in-acute-brain-stroke',
    title: 'Mechanical Thrombectomy: The Golden Hours of Brain Stroke Treatment',
    category: 'Acute Brain Stroke',
    readTime: '6 min read',
    date: 'September 15, 2026',
    author: 'Dr. Dewansh Mishra',
    authorRole: 'DM, Neurointervention (SCTIMST)',
    summary: 'How emergency mechanical clot retrieval restores blood supply to brain tissue during an acute ischemic stroke, saving millions of brain cells every minute.',
    content: [
      {
        type: 'paragraph',
        text: 'An acute ischemic stroke occurs when a blood clot blocks a major blood vessel supplying blood to a critical area of the brain. Deprived of oxygen, approximately 1.9 million neurons die every single minute the vessel remains blocked. Rapid recognition and immediate treatment are paramount to preventing irreversible disability.'
      },
      {
        type: 'heading',
        text: 'Recognizing Stroke Symptoms: The BE-FAST Protocol'
      },
      {
        type: 'paragraph',
        text: 'Early identification saves lives. Remember the BE-FAST acronym:'
      },
      {
        type: 'list',
        items: [
          'B - Balance: Sudden loss of balance or dizziness',
          'E - Eyes: Sudden double vision or loss of vision in one eye',
          'F - Face: Facial drooping or uneven smile',
          'A - Arms: Sudden weakness or numbness in one arm or leg',
          'S - Speech: Slurred speech or difficulty finding words',
          'T - Time: Time to call emergency services immediately'
        ]
      },
      {
        type: 'heading',
        text: 'What is Mechanical Thrombectomy?'
      },
      {
        type: 'paragraph',
        text: 'While intravenous clot-busting medications (IV thrombolysis) are effective for smaller blood vessels, large vessel occlusions (LVO) require mechanical clot extraction. Mechanical Thrombectomy is a life-saving procedure performed in the cath lab.'
      },
      {
        type: 'paragraph',
        text: 'Using micro-guided stent retrievers and aspiration catheters introduced through the femoral or radial artery, we navigate directly to the blocked brain artery. The clot is physically captured and suctioned out of the body within minutes, immediately restoring blood perfusion to the brain.'
      },
      {
        type: 'highlight',
        text: 'Clinical Window: Mechanical thrombectomy is proven effective within 6 hours of symptom onset, and up to 24 hours in select patients guided by advanced CT perfusion imaging.'
      },
      {
        type: 'heading',
        text: 'Why Emergency Specialized INR Care Matters'
      },
      {
        type: 'paragraph',
        text: 'Patients who undergo prompt mechanical thrombectomy have dramatically higher rates of independent recovery, walking without assistance, and returning home to their families. Rapid transfer to a comprehensive stroke center equipped with 24/7 INR expertise is the most decisive factor in stroke recovery.'
      }
    ]
  },
  {
    id: 3,
    slug: 'living-with-brain-avm-modern-embolization-options',
    title: 'Living with Brain AVM: Modern Non-Surgical Embolization Options',
    category: 'Vascular Malformation',
    readTime: '4 min read',
    date: 'August 28, 2026',
    author: 'Dr. Dewansh Mishra',
    authorRole: 'DM, Neurointervention (SCTIMST)',
    summary: 'A detailed look at Arteriovenous Malformations (AVM), how liquid embolization agents block abnormal blood vessel tangles, and post-procedure outlook.',
    content: [
      {
        type: 'paragraph',
        text: 'A Brain Arteriovenous Malformation (AVM) is an abnormal tangle of blood vessels connecting arteries and veins in the brain. Normally, high-pressure arterial blood passes through capillaries before entering delicate veins. In an AVM, capillaries are missing, exposing fragile veins to direct high-pressure arterial flow.'
      },
      {
        type: 'heading',
        text: 'Common Symptoms of Brain AVM'
      },
      {
        type: 'paragraph',
        text: 'Brain AVMs are often congenital and may remain asymptomatic until young adulthood. Common presentation symptoms include:'
      },
      {
        type: 'list',
        items: [
          'Unexplained seizures or epileptic fits in young adults',
          'Localized headaches or throbbing head pain',
          'Progressive weakness or numbness in parts of the body',
          'Intracranial hemorrhage causing sudden neurological changes'
        ]
      },
      {
        type: 'heading',
        text: 'Endovascular Liquid Embolization'
      },
      {
        type: 'paragraph',
        text: 'Endovascular embolization is a non-surgical procedure designed to block blood flow into the AVM nidus. Through a specialized microcatheter navigated into the feeder arteries of the AVM, medical liquid embolic agents (such as Onyx or Squid) are precisely injected.'
      },
      {
        type: 'paragraph',
        text: 'The liquid embolic solidifies inside the abnormal vessel network, sealing off the high-pressure shunts. This can completely cure smaller AVMs or safely reduce the size of larger AVMs prior to radiosurgery or microsurgery.'
      },
      {
        type: 'highlight',
        text: 'Expert Insight: Comprehensive DSA mapping is essential to carefully evaluate AVM feeders, venous drainage patterns, and associated aneurysms before deciding on the optimal treatment strategy.'
      }
    ]
  }
];

const INITIAL_CUSTOM_SECTIONS = [
  {
    id: 'sec-1',
    title: 'Special Neuro-Vascular Outpatient Clinic',
    subtitle: 'Comprehensive Care at Apollomedics Hospital, Lucknow',
    content: 'Dr. Dewansh Mishra provides specialized consultation for complex brain vascular diseases, unruptured aneurysms, AVMs, and second opinions on MRI/DSA scans.',
    badge: 'OPD ANNOUNCEMENT',
    bgColor: 'rgba(6, 182, 212, 0.05)',
    borderColor: 'rgba(6, 182, 212, 0.2)',
    buttonText: 'Book OPD Appointment',
    buttonLink: '#booking',
    isActive: true
  }
];

export function DataProvider({ children }) {
  // ─── DATA VERSION CACHE BUSTER ───────────────────────────────────────────
  // Change this version string any time you push new initial data to production.
  // On mismatch, all old localStorage is cleared → fresh initial data loads.
  const DATA_VERSION = 'v3';
  const storedVersion = localStorage.getItem('dewansh_data_version');
  if (storedVersion !== DATA_VERSION) {
    // Clear all old cached data keys
    [
      'dewansh_site_info',
      'dewansh_hero_slides',
      'dewansh_treatments',
      'dewansh_testimonials',
      'dewansh_testimonials_v2',
      'dewansh_patient_stories',
      'dewansh_blogs',
      'dewansh_custom_sections',
      'dewansh_gallery_images'
    ].forEach(key => localStorage.removeItem(key));
    // Stamp the new version
    localStorage.setItem('dewansh_data_version', DATA_VERSION);
  }
  // ─────────────────────────────────────────────────────────────────────────

  // Load state from localStorage or use initial defaults

  const [siteInfo, setSiteInfo] = useState(() => {
    const saved = localStorage.getItem('dewansh_site_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) {
          if (parsed.consultationFee === 600 || !parsed.consultationFee) {
            parsed.consultationFee = 500;
          }
          parsed.hoursOffline = "10:00 AM - 05:00 PM";
          parsed.hoursOnline = "11:00 AM - 07:00 PM";
          parsed.hoursMonSat = "Offline: 10:00 AM - 05:00 PM | Online: 11:00 AM - 07:00 PM";
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_SITE_INFO;
  });

  const [heroSlides, setHeroSlides] = useState(() => {
    const saved = localStorage.getItem('dewansh_hero_slides');
    return saved ? JSON.parse(saved) : INITIAL_HERO_SLIDES;
  });

  const [treatments, setTreatments] = useState(() => {
    const saved = localStorage.getItem('dewansh_treatments');
    return saved ? JSON.parse(saved) : INITIAL_TREATMENTS;
  });

  const [testimonials, setTestimonials] = useState(() => {
    // v2 key forces fresh load of updated reviews, discarding old cached ones
    const saved = localStorage.getItem('dewansh_testimonials_v2');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [patientStories, setPatientStories] = useState(() => {
    const saved = localStorage.getItem('dewansh_patient_stories');
    return saved ? JSON.parse(saved) : INITIAL_STORIES;
  });

  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem('dewansh_blogs');
    return saved ? JSON.parse(saved) : INITIAL_BLOGS;
  });

  const [customSections, setCustomSections] = useState(() => {
    const saved = localStorage.getItem('dewansh_custom_sections');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOM_SECTIONS;
  });

  const [galleryImages, setGalleryImages] = useState(() => {
    const saved = localStorage.getItem('dewansh_gallery_images');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY_IMAGES;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('dewansh_admin_token') === 'true';
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('dewansh_site_info', JSON.stringify(siteInfo));
  }, [siteInfo]);

  useEffect(() => {
    localStorage.setItem('dewansh_hero_slides', JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem('dewansh_treatments', JSON.stringify(treatments));
  }, [treatments]);

  useEffect(() => {
    localStorage.setItem('dewansh_testimonials_v2', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('dewansh_patient_stories', JSON.stringify(patientStories));
  }, [patientStories]);

  useEffect(() => {
    localStorage.setItem('dewansh_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('dewansh_custom_sections', JSON.stringify(customSections));
  }, [customSections]);

  useEffect(() => {
    localStorage.setItem('dewansh_gallery_images', JSON.stringify(galleryImages));
  }, [galleryImages]);

  // Admin Auth Helpers
  const loginAdmin = (email, password) => {
    // Configurable Doctor Admin Login Credentials
    if (email.toLowerCase().trim() === 'dewanshmishra@gmail.com' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('dewansh_admin_token', 'true');
      return { success: true };
    }
    // Also accept simple doctor login for testing ease
    if (email.toLowerCase().trim() === 'admin@gmail.com' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('dewansh_admin_token', 'true');
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin Email or Password' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('dewansh_admin_token');
  };

  // CRUD Actions
  const updateSiteInfo = (newInfo) => {
    setSiteInfo((prev) => ({ ...prev, ...newInfo }));
  };

  // Hero Banners
  const addHeroSlide = (slide) => {
    const newSlide = { id: 'slide-' + Date.now(), isBannerOnly: true, ...slide };
    setHeroSlides((prev) => [...prev, newSlide]);
  };
  const updateHeroSlide = (id, updatedSlide) => {
    setHeroSlides((prev) => prev.map(s => s.id === id ? { ...s, ...updatedSlide } : s));
  };
  const deleteHeroSlide = (id) => {
    setHeroSlides((prev) => prev.filter(s => s.id !== id));
  };

  // Treatments
  const addTreatment = (item) => {
    const newItem = { id: 'trt-' + Date.now(), ...item };
    setTreatments((prev) => [...prev, newItem]);
  };
  const updateTreatment = (id, updatedItem) => {
    setTreatments((prev) => prev.map(t => t.id === id ? { ...t, ...updatedItem } : t));
  };
  const deleteTreatment = (id) => {
    setTreatments((prev) => prev.filter(t => t.id !== id));
  };

  // Testimonials
  const addTestimonial = (item) => {
    const newItem = { id: 'rev-' + Date.now(), ...item };
    setTestimonials((prev) => [...prev, newItem]);
  };
  const updateTestimonial = (id, updatedItem) => {
    setTestimonials((prev) => prev.map(t => t.id === id ? { ...t, ...updatedItem } : t));
  };
  const deleteTestimonial = (id) => {
    setTestimonials((prev) => prev.filter(t => t.id !== id));
  };

  // Patient Stories
  const addPatientStory = (item) => {
    const newItem = { id: 'story-' + Date.now(), ...item };
    setPatientStories((prev) => [...prev, newItem]);
  };
  const updatePatientStory = (id, updatedItem) => {
    setPatientStories((prev) => prev.map(s => s.id === id ? { ...s, ...updatedItem } : s));
  };
  const deletePatientStory = (id) => {
    setPatientStories((prev) => prev.filter(s => s.id !== id));
  };

  // Blogs
  const addBlog = (item) => {
    const newItem = { id: Date.now(), ...item };
    setBlogs((prev) => [newItem, ...prev]);
  };
  const updateBlog = (id, updatedItem) => {
    setBlogs((prev) => prev.map(b => b.id === id ? { ...b, ...updatedItem } : b));
  };
  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter(b => b.id !== id));
  };

  // Custom Sections
  const addCustomSection = (section) => {
    const newSection = { id: 'sec-' + Date.now(), isActive: true, ...section };
    setCustomSections((prev) => [...prev, newSection]);
  };
  const updateCustomSection = (id, updatedSection) => {
    setCustomSections((prev) => prev.map(s => s.id === id ? { ...s, ...updatedSection } : s));
  };
  const deleteCustomSection = (id) => {
    setCustomSections((prev) => prev.filter(s => s.id !== id));
  };

  // Gallery Images
  const addGalleryImage = (item) => {
    const newItem = { id: 'gallery-' + Date.now(), title: item.title || `Clinical Photo ${galleryImages.length + 1}`, url: item.url };
    setGalleryImages((prev) => [newItem, ...prev]);
  };
  const deleteGalleryImage = (id) => {
    setGalleryImages((prev) => prev.filter(g => g.id !== id));
  };

  return (
    <DataContext.Provider value={{
      siteInfo,
      heroSlides,
      treatments,
      testimonials,
      patientStories,
      blogs,
      customSections,
      galleryImages,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      updateSiteInfo,
      addHeroSlide,
      updateHeroSlide,
      deleteHeroSlide,
      addTreatment,
      updateTreatment,
      deleteTreatment,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      addPatientStory,
      updatePatientStory,
      deletePatientStory,
      addBlog,
      updateBlog,
      deleteBlog,
      addCustomSection,
      updateCustomSection,
      deleteCustomSection,
      addGalleryImage,
      deleteGalleryImage
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
