#!/bin/bash

FOLDER=~/badawy-tv.github.io/pages/family-teachings

declare -A pages
pages["family-foundations.html"]="Family Foundations|Principles of a righteous family based on love, respect, and faith.|Quran 4:36|https://quran.com/4/36"
pages["akhlaq-in-the-home.html"]="Akhlaq in the Home|Importance of manners, ethical behavior, and Islamic character within the home.|Quran 31:18-19|https://quran.com/31/18-19"
pages["building-an-islamic-home.html"]="Building an Islamic Home|Creating a spiritually nurturing household with strong family values.|Quran 66:6|https://quran.com/66/6"
pages["family-conflict-resolution.html"]="Family Conflict Resolution|Methods to maintain peace and resolve conflicts in a family.|Quran 49:10|https://quran.com/49/10"
pages["marriage-in-islam.html"]="Marriage in Islam|Rights, duties, and etiquettes of spouses in a healthy Islamic marriage.|Quran 30:21|https://quran.com/30/21"
pages["protecting-the-family.html"]="Protecting the Family|Guarding the family from moral, social, and spiritual challenges.|Quran 4:1|https://quran.com/4/1"
pages["raising-children.html"]="Raising Children|Guidance on nurturing children with faith, discipline, and values.|Quran 66:6|https://quran.com/66/6"
pages["rights-of-spouses.html"]="Rights of Spouses|Understanding marital rights and responsibilities to maintain harmony.|Quran 2:228|https://quran.com/2/228"
pages["teaching-children-salah.html"]="Teaching Children Salah|Teaching children prayers and making worship a regular practice.|Quran 29:45|https://quran.com/29/45"

for file in "${!pages[@]}"; do
  IFS="|" read -r title desc qref qlink <<< "${pages[$file]}"
  cat > $FOLDER/$file << EOP
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>$title</title>
<link rel="stylesheet" href="../../assets/css/style.css">
<style>
body {font-family: Arial, sans-serif; line-height:1.6; padding:20px; max-width:900px; margin:auto; background:#fdfdfd;}
h1, h2 {color:#1e3a8a;}
p {margin-bottom:15px;}
a.btn-back {display:inline-block; margin-top:20px; padding:10px 18px; background:#1e90ff; color:#fff; text-decoration:none; border-radius:6px;}
a.btn-back:hover {background:#1c86ee;}
blockquote {background:#f0f0f0; border-left:4px solid #1e90ff; padding:10px 15px; margin:15px 0;}
</style>
</head>
<body>
<h1>$title</h1>
<p>$desc</p>

<h2>Quranic Guidance</h2>
<p><strong>Reference:</strong> <a href="$qlink" target="_blank">$qref</a></p>
<blockquote>
<!-- Example Quran verse snippet -->
$(
case $file in
  "family-foundations.html") echo "Worship Allah and associate nothing with Him, and show kindness to parents and family.";;
  "akhlaq-in-the-home.html") echo "Be humble and speak kindly to your parents and family members.";;
  "building-an-islamic-home.html") echo "Protect your home and family spiritually, creating an environment of faith.";;
  "family-conflict-resolution.html") echo "The believers are brothers; reconcile between them and maintain peace.";;
  "marriage-in-islam.html") echo "And of His signs is that He created spouses for you, so you may find tranquility with them.";;
  "protecting-the-family.html") echo "Fear Allah as He should be feared and protect your family from harm.";;
  "raising-children.html") echo "Guard yourselves and your families from fire, and teach children the way of faith.";;
  "rights-of-spouses.html") echo "Men and women have rights over each other, maintain harmony and fairness.";;
  "teaching-children-salah.html") echo "Establish regular prayers and teach children the obligatory prayers from young age.";;
esac
)
</blockquote>

<h2>Practical Examples</h2>
<p>$(
case $file in
  "family-foundations.html") echo "Example: Begin your day with family supplications, share meals, and consult each other in decisions.";;
  "akhlaq-in-the-home.html") echo "Example: Encourage politeness, gratitude, and patience among family members.";;
  "building-an-islamic-home.html") echo "Example: Create a small prayer corner, schedule daily Quran reading together.";;
  "family-conflict-resolution.html") echo "Example: Use calm discussion, mutual forgiveness, and refer to Islamic teachings in disputes.";;
  "marriage-in-islam.html") echo "Example: Practice mutual respect, love, and understanding, as recommended in Sunnah.";;
  "protecting-the-family.html") echo "Example: Monitor online content, encourage halal social interactions, and instill moral values.";;
  "raising-children.html") echo "Example: Set routines, teach Islamic manners, and use positive reinforcement.";;
  "rights-of-spouses.html") echo "Example: Equitable division of responsibilities, active listening, and patience in disagreements.";;
  "teaching-children-salah.html") echo "Example: Start teaching children short prayers early, with rewards and encouragement.";;
esac
)</p>

<h2>Illustrative Story</h2>
<p>$(
case $file in
  "family-foundations.html") echo "Story: Prophet Muhammad (ﷺ) emphasized kindness to family; once he helped his grandsons and taught respect to elders.";;
  "akhlaq-in-the-home.html") echo "Story: A family resolving conflict with patience and good manners saw peace and happiness grow in their home.";;
  "building-an-islamic-home.html") echo "Story: A household that read Quran daily built a strong faith foundation for their children.";;
  "family-conflict-resolution.html") echo "Story: A couple reconciled after a disagreement by following prophetic guidance on forgiveness.";;
  "marriage-in-islam.html") echo "Story: A newlywed couple strengthened their bond through mutual consultation and prayers together.";;
  "protecting-the-family.html") echo "Story: Parents guiding children towards halal entertainment prevented conflicts and strengthened family morals.";;
  "raising-children.html") echo "Story: Teaching children good manners early helped them excel socially and spiritually.";;
  "rights-of-spouses.html") echo "Story: Observing mutual rights led to a harmonious household, admired by neighbors.";;
  "teaching-children-salah.html") echo "Story: A child who learned prayers young became consistent in worship into adulthood.";;
esac
)</p>

<a href="index.html" class="btn-back">Back to Family Topics</a>
</body>
</html>
EOP
done
