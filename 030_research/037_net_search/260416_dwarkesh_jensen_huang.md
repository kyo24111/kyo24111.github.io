# Dwarkesh × Jensen Huang — NVIDIA CEO インタビュー

**収録日**: 2026-04-15  
**ソース**: [dwarkesh.com/p/jensen-huang](https://www.dwarkesh.com/p/jensen-huang)  
**テーマ**: サプライチェーン・TPU競争・ハイパースケーラー戦略・中国輸出規制・チップアーキテクチャ

---

## 目次

1. [原文（英語そのまま）](#1-原文英語そのまま)
2. [英語（整形版）](#2-英語整形版)
3. [日本語訳（全文）](#3-日本語訳全文)
4. [日本語（要点まとめ）](#4-日本語要点まとめ)
5. [知っておくべき知識・単語の解説](#5-知っておくべき知識単語の解説)

---

## 1. 原文（英語そのまま）

**00:00:00 – Is Nvidia's biggest moat its grip on scarce supply chains?**

Dwarkesh Patel: We've seen the valuations of a bunch of software companies crash because people are expecting AI to commoditize software. There's a potentially naive way of thinking about things, which is: look, Nvidia sends a GDS2 file to TSMC. TSMC builds the logic dies, it builds the switches, then it packages them with the HBM that SK Hynix, Micron, and Samsung make. Then it sends it to an ODM in Taiwan where they assemble the racks. Nvidia is fundamentally making software that other people are manufacturing, and if software gets commoditized, does Nvidia get commoditized?

Jensen Huang: In the end, something has to transform electrons to tokens. The transformation of electrons to tokens and making those tokens more valuable over time is hard to completely commoditize. The transformation from electrons to tokens is such an incredible journey. Making that token is like making one molecule more valuable than another molecule, making one token more valuable than another. The amount of artistry, engineering, science, and invention that goes into making that token valuable, obviously we're watching it happen in real time. The transformation, the manufacturing, all of the science that goes in there is far from deeply understood and the journey is far from over. I doubt that it will happen. We're going to make it more efficient, of course. The way that you framed the question is my mental model of our company. The input is electrons, the output is tokens. In the middle is Nvidia. Our job is to do as much as necessary and as little as possible to enable that transformation to be done at incredible capabilities. What I mean by "as little as possible," whatever I don't need to do, I partner with somebody and make it part of my ecosystem. If you look at Nvidia today, we probably have the largest ecosystem of partners, both in the supply chain upstream and downstream, all of the computer companies, application developers, and model makers. AI is a five-layer cake, if you will. We have ecosystems across the entire five layers. We try to do as little as possible, but the part that we have to do, as it turns out, is insanely hard. I don't think that gets commoditized. In fact, I also don't think the enterprise software companies, the tools makers… Most software companies today are tool makers. Some of them are not. Some of them are workflow codification systems. But for a lot of companies, they're tool makers. For example, Excel is a tool, PowerPoint is a tool, Cadence makes tools, Synopsys makes tools. I actually see the opposite of what people see. I think the number of agents is going to grow exponentially, and the number of tool users is going to grow exponentially. It's very likely that the number of instances of all these tools is going to skyrocket. It's very likely that the number of instances of Synopsys Design Compiler is going to skyrocket, along with the number of agents using the floor planners, our layout tools, and our design rule checkers. Today we're limited by the number of engineers. Tomorrow, those engineers are going to be supported by a bunch of agents. We're going to be exploring the design space like you've never seen before, and we're going to use the tools that we use today. I think tool use is going to cause the software companies to skyrocket. The reason why it hasn't happened yet is because the agents aren't good enough at using their tools yet. Either these companies are going to build the agents themselves, or agents are going to get good enough to be able to use those tools. I think it's going to be a combination of both.

Dwarkesh Patel: I think in your latest filings, you had almost a $100 billion in purchase commitments with foundries, memory, and packaging. SemiAnalysis has reported that you will have $250 billion of these kinds of purchase commitments. One interpretation is that Nvidia's moat is really that you've locked up many years of these scarce components. Somebody else might have an accelerator, but can they actually get the memory to build it? Can they actually get the logic to build it? Is this really Nvidia's big moat for the next few years?

Jensen Huang: It's one of the things that we can do that is hard for someone else to do. We've made enormous commitments upstream. Some of it is explicit, these commitments that you mentioned. Some of it is implicit. For example, a lot of the investments that are upstream are made by our supply chain because I said to the CEOs, "Let me tell you how big this industry is going to be, let me explain to you why, let me reason through it with you, and let me show you what I see." As a result of that process of informing, inspiring, and aligning with CEOs of all different industries upstream, they're willing to make the investments. Why are they willing to make the investments for me and not someone else? The reason for that is because they know that I have the capacity to buy their supply and sell it through my downstream. The fact is that Nvidia's downstream supply chain and our downstream demand is so large, they're willing to make the investment upstream. If you look at GTC, people are marveled by the scale of it and the people that go. It's a full 360 degrees, the entire universe of AI all in one place. They're all in one place because they need to see each other. I bring them together so that the downstream can see the upstream, the upstream can see the downstream, and all of them can see the advances in AI. Very importantly, they can all meet the AI natives, all the AI startups being built, and all the amazing things happening so they can see firsthand all the things that I tell them. I spend a lot of my time informing, directly or indirectly, our supply chain, partners, and ecosystem about the opportunity in front of us. Some people always say, "Jensen, in most keynotes, it's one announcement after another." With our keynotes, there's always a part of it that's a little torturous in the sense that it almost comes across like education. In fact, that's exactly on my mind. I need to make sure the entire supply chain, upstream and downstream, the ecosystem, understands what is coming at us, why it's coming, when it's coming, how big it's going to be, and is able to reason about it systematically, just like I reason about it. Regarding the moat as you describe it, we're able to build for a future. If our next several years are a trillion dollars in scale, we have the supply chain to do it. Without our reach, the velocity of our business… Just as there's cash flow, there's supply chain flow, there's churns. Nobody is going to build a supply chain for an architecture if the business churns are low. Our ability to sustain the scale is only because our downstream demand is so great. And they see it, they hear about it, they see it all coming. That allows us to do the things we're able to do at the scale we do them.

Dwarkesh Patel: I do want to understand more concretely whether the upstream can keep up. For many years now, you guys have been 2x-ing revenue year over year. You've been more than tripling the amount of flops you're providing to the world year over year.

Jensen Huang: And 2x-ing at this scale now is really incredible.

Dwarkesh Patel: Exactly. But then you look at logic. You're the biggest customer on TSMC's N3 node, and you're one of the biggest on N2. AI as a whole this year is going to be sixty percent of N3. It's going to be 86% next year, according to SemiAnalysis. How do you double if you're the majority? And how do you do that year over year? Are we in a regime now where the growth rate in AI compute has to slow because of upstream? Do you see a way to get around this? How do we build 2x more fabs year over year, ultimately?

Jensen Huang: At some level, the instantaneous demand is greater than the supply upstream and downstream in the world. At any instant, we could be limited by the number of plumbers, which actually happens.

Dwarkesh Patel: The plumbers are invited to next year's GTC.

Jensen Huang: By the way, great idea. But that's a good condition. You want an industry where the instantaneous demand is greater than the total supply of the industry. The opposite is obviously less good. If we're too far apart, if one particular component is too far away, the industry swarms it. For example, notice people aren't talking very much about CoWoS anymore. The reason for that is because for two years we swarmed the living daylights out of it. We doubled, doubled, doubled on several doubles. Now I think we're in fairly good shape. TSMC now knows that CoWoS supply has to keep up with the rest of the logic demand and the memory demand. They're scaling CoWoS and future packaging technologies at the same level as they scale logic. This is terrific, because for a long time, CoWoS and HBM memory were rather specialty. But they're not specialties anymore. People now realize they're mainstream computing technology. Of course, we're now much more able to influence a larger scope of our supply chain. At the beginning of the AI revolution, all the things that I say now, I was saying five years ago. Some people believed in it and invested in it, for example, Sanjay and the Micron team. I still remember the meeting really well where I was clear about exactly what was going to happen, why it was going to happen, and the predictions of today. They really doubled down on it. We partnered with them across LPDDR and HBM memories, and they really invested in it. It obviously has been tremendous for the company. Some people came a little bit later, but now they're all here. Each one of these bottlenecks gets a great deal of attention. Now we're prefetching the bottlenecks years in advance. For example, the investments that we've done with Lumentum, Coherent, and the silicon photonics ecosystem over the last several years really reshaped the supply chain. We built up an entire supply chain around TSMC. We partnered with them on COUPE, invented a whole bunch of technology, and licensed those patents to the supply chain to keep it nice and open. We're preparing the supply chain through the invention of new technologies, new workflows, new testing equipment like double-sided probing, investing in companies, and helping them scale up their capacity. You can see that we're trying to shape the ecosystem so that the supply chain is ready to support the scale.

Dwarkesh Patel: It seems like some bottlenecks are easier than others. Scaling up CoWoS versus scaling up—

Jensen Huang: I went to the hardest one, by the way.

Dwarkesh Patel: Which is?

Jensen Huang: Plumbers. Plumbers and electricians. This is one of the concerns that I have about the doomers describing the end of work and killing of jobs. If we discourage people from being software engineers, we're going to run out of software engineers. The same prediction happened ten years ago. Some of the doomers were telling people, "Whatever you do, don't be a radiologist." You might hear some of those videos still on the web saying radiology is going to be the first career to go and the world is not going to need any more radiologists. Guess what we're short of? Radiologists.

Dwarkesh Patel: Going back to this point about how some things you can scale, and other things… How do you actually manufacture 2x the amount of logic a year? Ultimately, memory and logic are bottlenecked by EUV. How do you get to 2x as many EUV machines year over year?

Jensen Huang: None of that is impossible to scale quickly. All of that is easy to do within two or three years. You just need a demand signal. Once you can build one, you can build ten, and once you can build ten, you can build a million. These things are not hard to replicate.

Dwarkesh Patel: How far down the supply chain do you go? Do you go to ASML and say, "Hey, if I look out three years from now, for Nvidia to be generating two trillion a year in revenue, we need way more EUV machines"?

Jensen Huang: Some of them I have to directly, some of them indirectly, and some of them… If I can convince TSMC, ASML will be convinced. We have to think about the critical pinch points. But if TSMC is convinced, you'll have plenty of EUV machines in a few years. My point is that none of the bottlenecks last longer than a couple of years, two, three years, none of them. Meanwhile, we're improving computing efficiency by 10x 20x, and in the case of Hopper to Blackwell, 30x to 50x. We're coming up with new algorithms because CUDA is so flexible. We're developing all kinds of new techniques so that we drive efficiency in addition to increasing capacity. None of those things worry me. It's the stuff that's downstream from us. Energy policies that prevent energy from… You can't create an industry without energy. You can't create a whole new manufacturing industry without energy. We want to reindustrialize the United States. We want to bring back chip manufacturing, computer manufacturing, and packaging. We want to build new things like EVs and robots. We want to build AI factories. You can't build any of these things without energy, and those things take a long time. More chip capacity, that's a 2-3 year problem. More CoWoS capacity, 2-3 year problem.

---

**00:16:25 – Will TPUs break Nvidia's hold on AI compute?**

Dwarkesh Patel: True. I want to ask about your competitors. If you look at the TPU, arguably two out of the top three models in the world, Claude and Gemini, were trained on TPU. What does that mean for Nvidia going forward?

Jensen Huang: We build a very different thing. What Nvidia built is accelerated computing, not a tensor processing unit. Accelerated computing is used for all kinds of things: molecular dynamics, quantum chromodynamics, data processing, data frames, structured data, and unstructured data. It's also used for fluid dynamics and particle physics. In addition, we use it for AI. Accelerated computing is much more diverse. Although AI is the conversation today and is obviously very important and impactful, computing is much broader than that. Nvidia has reinvented the way computing is done, moving from general-purpose computing to accelerated computing. Our market reach is far greater than any TPU or ASIC can possibly have. If you look at our position, we're the only company that accelerates applications of all kinds. We have a gigantic ecosystem. So all kinds of frameworks and algorithms run on Nvidia. Because our computers are designed to be operated by other people, anyone who's an operator can buy our systems. With most of these home-built systems, you have to be your own operator because they were never designed to be flexible enough for others to operate. Because anybody can operate our systems, we're in every cloud, including Google, Amazon, Azure, and OCI. If you want to operate it to rent, you better have a large ecosystem of customers in many industries to be the offtakers. If you want to operate it for yourself, we obviously have the ability to help you operate it yourself, like we did for Elon with xAI. And because we can enable operators in any company and any industry, you could use it to build a supercomputer for scientific research and drug discovery at Lilly. We can help them operate their own supercomputer and use it for the entire diversity of drug discovery and biological sciences that we accelerate. There are just a whole bunch of applications that we can address that you can't do with TPUs. Nvidia built CUDA to be a fantastic tensor processing unit as well, but it also handles every life cycle of data processing, computing, AI, and so on. Our market opportunity is just a lot larger, and our reach is a lot greater. Because we support every application in the world now, you can build Nvidia systems anywhere and know that there will be customers for it. It's a very different thing.

Dwarkesh Patel: This is going to be a long question. You have spectacular revenue, and you're not making $60 billion a quarter from pharma and quantum. You're making it because AI is an unprecedented technology that is growing unprecedentedly fast. The question then is what is best for AI specifically. I'm not in the details, but I talk to my AI researcher friends and they say, "Look, when I use a TPU, it's this big systolic array that's perfect for doing matrix multiplies, whereas a GPU is very flexible. It's great when you have lots of branching or irregular memory access." But what is AI? It's just these very predictable matrix multiplies again and again and again. You don't have to give up any die area for warp schedulers or switches between threads and memory banks. And the TPU is really optimized for the bulk of this growth in revenue and use case for compute that is coming online right now. I wonder how you react to that.

Jensen Huang: Matrix multiplies are an important part of AI, but they're not the only part. If you want to come up with a new attention mechanism, disaggregate in a different way, or invent a whole new type of architecture altogether—like a hybrid SSM—you want an architecture that's generally programmable. If you want to create a model that fuses diffusion and autoregressive techniques, you want an architecture that's just generally programmable. We run everything you can imagine. That's the advantage. It allows for the invention of new algorithms a lot more easily, because it's a programmable system. The ability to invent new algorithms is really what makes AI advance so quickly. TPUs, like anything else, are impacted by Moore's Law, which we know is increasing by about 25% per year. The only way to really get 10x or 100x leaps is to fundamentally change the algorithm and how it's computed every single year. That's Nvidia's fundamental advantage. The only reason we were able to make Blackwell to Hopper 50x… When I first announced Blackwell was going to be 35x more energy efficient than Hopper, nobody believed it. Then Dylan wrote an article saying I sandbagged, and it's actually fifty times. You can't reasonably do that with just Moore's Law. The way we solve that problem is with new models, like MoEs, that are parallelized, disaggregated, and distributed across a computing system. Without the ability to really get down and come up with new kernels with CUDA, it's really hard to do. It's the combination of the programmability of our architecture and the fact that Nvidia is an extreme co-design company. We can even offload some of the computation into the fabric itself, like NVLink, or into the network with Spectrum-X. We could affect change across the processors, the system, the fabric, the libraries, and the algorithm simultaneously. Without CUDA to do that, I wouldn't even know where to start.

Dwarkesh Patel: This gets at an interesting question about Nvidia's clientele. 60% of your revenue is coming from these big five hyperscalers. In a different era with different customers—let's say professors running experiments—they need CUDA. They can't use another accelerator. They just needed to run PyTorch with CUDA and have everything optimized. But these hyperscalers have the resources to write their own kernels. In fact, they have to in order to get that last 5% of performance they need for their specific architecture. Anthropic and Google are mostly running their own accelerators or running TPUs and Trainium. But even OpenAI, using GPUs, has Triton because they need their own kernels. Down to CUDA C++, instead of using cuBLAS and NCCL, they've got their own stack which compiles to other accelerators as well. If most of your customers can and do make replacements for CUDA, to what extent is CUDA really the thing that is going to make frontier AI happen on Nvidia?

Jensen Huang: CUDA is a rich ecosystem. If you want to build on any computer first, building on CUDA first is incredibly smart. Because the ecosystem is so rich, we support every framework. If you want to create custom kernels… For example, we contribute enormously to Triton. So the back end of Triton has huge amounts of Nvidia technology. We're delighted to help every framework become as great as it can be. There are lots and lots of frameworks. There's Triton, vLLM, SGLang, and more. Now there's a whole bunch of new reinforcement learning frameworks coming out, like verl and NeMo RL. With post-training and reinforcement learning, that entire area is just exploding. So if you want to build on an architecture, building on CUDA makes the most sense because you know the ecosystem is great. You know that if something happens, it's more likely in your code and not in the mountain of code underneath. Don't forget the amount of code you're dealing with when building these systems. When something doesn't work, was it you or was it the computer? You would like it to always be you and to be able to trust the computer. Obviously, we still have lots of bugs ourselves, but our system is so well wrung out that you can at least build on top of the foundation. That's number one: the richness, programmability, and capability of the ecosystem. The second thing is, if you're a developer building anything at all, the single most important thing you want is an install base. You want the software you write to run on a whole bunch of other computers. You're not building software just for yourself. You're building it for your fleet or everybody else's fleet because you're a framework builder. Nvidia's CUDA ecosystem is ultimately its great treasure. We have several hundred million GPUs out there now. Every cloud has it. It goes back to the A10, A100, H100, H200, the L series, the P series. There's a whole bunch of them. They're in all kinds of sizes and shapes. If you're a robotics company, you want that CUDA stack to actually run in the robot itself. We're literally everywhere. The install base means that once you develop the software or the model, it's going to be useful everywhere. That is just incredibly valuable. Lastly, the fact that we're in every single cloud makes us genuinely unique. If you're an AI company or developer, you're not exactly sure which cloud service provider you're going to partner with or where you'd like to run it. We run everywhere, including on-prem for you if you like. The combination of the richness of the ecosystem, the expansiveness of the install base, and the versatility of where we are makes CUDA invaluable.

Dwarkesh Patel: That makes a lot of sense. I guess the thing I'm curious about is whether those advantages matter a lot to your main customers. There's many people for whom they might matter. The kind of person who can actually build their own software stack makes up most of your revenue. Especially if you go to a world where AI is getting especially good at the things which have tight verification loops where you can RL on them…. This question of how do you write a kernel that does attention or MLP the most efficiently across a scale up? It's a very verifiable sort of feedback loop. Can all the hyperscalers write these custom kernels for themselves? Nvidia still has great price performance, so they might still prefer to use Nvidia. But then the question is, does it just become a question of who is offering the best specs, the best flops and memory bandwidth for a given dollar. Whereas historically Nvidia has just had, and still has, the best margins in all of AI across hardware and software, +70%, because of this CUDA moat. And the question is, can you sustain those margins if for most of your customers, they can actually afford to build, instead of the CUDA moat?

Jensen Huang: The number of engineers we have assigned to these AI labs is insane, working with them, optimizing their stack. The reason for that is because nobody knows our architecture better than we do. These architectures are not as general purpose as a CPU. A CPU is kind of like a Cadillac. It's a nice cruiser. It never goes too fast. Everybody drives it pretty well. It's got cruise control, and everything's easy. But in a lot of ways, Nvidia's GPUs, accelerators, are like F1 racers. I could imagine everybody's able to drive it at a hundred miles an hour, but it takes quite a bit of expertise to be able to push it to the limit. We use a ton of AI to create the kernels that we have. I'm pretty sure we're going to still be needed for quite some time. Our expertise helps our AI lab partners to get another 2x out of their stack easily oftentimes. It's not unusual that by the time we're done optimizing their stack or optimizing a particular kernel, their model sped up by 3x, 2x, 50%. That's a huge number, especially when you're talking about the install base of the fleet that they have, of all the Hoppers and Blackwells that they have. When you increase it by a factor of two, that doubles the revenues. That directly translates to revenues. Nvidia's computing stack is the best performance per TCO in the world, bar none. Nobody can demonstrate to me that any single platform in the world today has a better performance-TCO ratio. Not one company. In fact, the benchmarks that are out there. Dylan's InferenceMAX is sitting out there for everybody to use, and not one… TPU won't come, Trainium won't come. I encourage them to use InferenceMAX and demonstrate their incredible inference cost. It's really hard. Nobody wants to show up. MLPerf. I would welcome Trainium to demonstrate their 40% that they claim all the time. I would love to hear them demonstrate the cost advantage of TPUs. It makes no sense in my mind. It makes absolutely zero sense. On first principles, it makes no sense. So I think the reason why we're so successful is simply because our TCO is so great. Secondly, you say 60% of our customers are the top five, but most of that business is external. For example, most of Nvidia in AWS is for external customers, not internal use. Most of our customers at Azure, obviously all of our customers are external. All of our customers at OCI are external, not internal use. The reason why they favor us is because our reach is so great. We can bring them all of the great customers in the world. They're all built on Nvidia. And the reason why all these companies are built on Nvidia is because our reach and our versatility is so great. So I think the flywheel is really install base, the programmability of our architecture, the richness of our ecosystem, and the fact that there's so many AI companies in the world. There's tens of thousands of them now. If you were one of those AI startups, what architecture would you choose? You would choose an architecture that's most abundant. We're the most abundant in the world. You'd choose the one that has the largest installed base. We're the largest install base. And you'd choose the one that has a rich ecosystem. So that's the flywheel. That's the reason why, between the combination of: one, our perf per dollar is so great that they have the lowest cost tokens. Second, our perf per watt is the highest in the world. So if one of these companies, if our partners, built a one gigawatt data center, that one gigawatt data center better deliver the maximum amount of revenues and number of tokens, which directly translates to revenues. You want it to generate as many tokens as possible, maximize the revenues for that data center. We are the highest tokens per watt architecture in the world. Lastly, if your goal is to rent the infrastructure, we have the most customers in the world. So that's the reason why the flywheel works.

Dwarkesh Patel: Interesting. I guess the question comes down to, what is the actual market structure here? Because even if there's other companies… There could have been a world where there's tens of thousands of AI companies that have roughly equal share of compute. But even through these five hyperscalers, really the people on Amazon using the compute are Anthropic, OpenAI, and these big foundation labs who can themselves afford and have the ability to make different accelerators work.

Jensen Huang: No, I think your premise is wrong.

Dwarkesh Patel: Maybe. But let me ask you a slightly different question.

Jensen Huang: Come back and make me correct your premise.

Dwarkesh Patel: Okay. Let me just ask you a different question.

Jensen Huang: But still make sure to make me come back and fix because it's just too important to AI. It's too important to the future of science. It's too important to the future of the industry. That premise… Look —

Dwarkesh Patel: Let me just finish the question and then we can address it together.

Jensen Huang: Yeah.

Dwarkesh Patel: If all these things are true about price, performance, and performance per watt, et cetera, are true, why do you think it is the case that, say, Anthropic for example, just announced a couple days ago they have a multi-gigawatt deal with Broadcom and Google for TPUs and majority of their compute? Obviously for Google, TPU is a majority of compute. So if I look at these big AI companies, it seems like a lot of their compute… There was some point where it's all Nvidia and now it's not. So I'm curious how to square, if these things are true on paper, why are they going with other accelerators?

Jensen Huang: Anthropic is a unique instance, not a trend. Without Anthropic, why would there be any TPU growth at all? It's 100% Anthropic. Without Anthropic, why would there be Trainium growth at all? It's 100% Anthropic. I think that's fairly well known and well understood. It's not that there's an abundance of ASIC opportunities. There's only one Anthropic.

Dwarkesh Patel: But OpenAI's deals with AMD… They're building their own Titan accelerator.

Jensen Huang: Yeah, but I think we could all acknowledge they're vastly Nvidia. We're going to still do a lot of work together. I'm not offended by other people using something else and trying things. If they don't try these other things, how would they know how good ours is? Sometimes you've got to be reminded of it. We have to continuously earn the position that we're in. There are always big claims. Look at the number of ASICs that have been canceled. Just because you're going to build an ASIC… You still have to build something better than Nvidia. It's not that easy building something better than Nvidia. It's not sensible, actually. Nvidia's got to be missing something, seriously. Because of our scale, our velocity, we're the only company in the world that's cranking it out every single year. Big leaps, every single year.

Dwarkesh Patel: I guess their logic is, "Hey, it doesn't need to be better. It just needs to be not more than 70% worse," because they're paying you 70% margins.

Jensen Huang: No, don't forget, even in ASICs margins are really quite high. Nvidia's margin is 70%, let's say. But ASIC margins are 65%. What are you really saving? You've got to pay somebody. I think the ASIC margins are incredibly good, from what I can tell. So, you asked the question why. A long time ago, we just didn't have the ability to do it. At the time, I didn't deeply internalize how difficult it would be to build a foundation AI lab like OpenAI and Anthropic, and the fact that they needed huge investments from the supplier themselves. We just weren't in a position to make the multi-billion dollar investment into Anthropic so that they could use our compute. But Google and AWS were. They put in huge investments in the beginning so that Anthropic, in return, used their compute. I would say my mistake is I didn't deeply internalize that they really had no other options, that a VC would never put in $5-10 billion of investment into an AI lab with the hopes of it turning out to be Anthropic. So that was my miss. But I'm not going to make that same mistake again. I'm delighted to invest in OpenAI, and I'm delighted to help them scale, and I believe it's essential to do so.

---

**00:41:06 – Why doesn't Nvidia become a hyperscaler?**

Dwarkesh Patel: This is actually quite interesting. For many years Nvidia has been the company in AI making money, making lots of money. Now you're investing it. It's been reported that you've done up to $30 billion in OpenAI and $10 billion in Anthropic. But now their valuations have increased, and I'm sure they'll continue to increase. So if over these many years you were giving them the compute, you saw where it was headed, and they were worth like one tenth what they're worth now a couple years ago—or even a year ago in some cases and you had all this cash — there's a world where either Nvidia themselves becomes a foundation lab, does a huge investment to make that possible, or has made the deals you've made now at current valuations much earlier on. And you had the cash to do it. So I am curious, actually, why not have done it earlier?

Jensen Huang: We did it as soon as we could have. We did it as soon as we could have, and if I could have, I would've done it even earlier. At the time that Anthropic needed us to do it, we just weren't in a position to do it. It wasn't in our sensibility to do so.

Dwarkesh Patel: How so? Was it like a cash thing?

Jensen Huang: Yeah, the level of investment. We had never invested outside the company at the time, and not that much. We didn't realize we needed to. I always thought that they could just go raise from VCs, for God's sakes, like all companies do. But what they were trying to do couldn't have been done through VCs. What OpenAI wanted to do couldn't have been done through VCs. I recognize that now. I didn't know it then. But that's their genius. That's why they're smart. They realized then that they had to do something like that. And I'm delighted that they did. Even though we caused Anthropic to have to go to somebody else, I'm still happy that it happened. Anthropic's existence is great for the world. I'm delighted for it.

Dwarkesh Patel: So the question still arises. Okay, now that we're here and you have all this money that you keep making, what should Nvidia be doing with it? There's one answer which is that there's this whole middleman ecosystem that has popped up for converting CapEx into OpEx for these labs so that they can rent compute. Because the chips are really expensive, they make a lot of money over their lifetime because the AI models are getting better. So the value that they generate, their tokens, is increasing, but they're expensive to set up. Nvidia has the money to do the CapEx. In fact, it's been reported, you are backstopping CoreWeave up to $6.3 billion and have invested $2 billion. Why doesn't Nvidia become a cloud themselves? Why doesn't it become a hyperscaler themselves and rent this compute out? You have all this cash to do it.

Jensen Huang: This is a philosophy of the company, and I think it's wise. We should do as much as needed, as little as possible. What that means is, the work that we do with building our computing platform, if we don't do it, I genuinely believe it doesn't get done. If we didn't take the risk that we take—if we didn't build NVLink the way we built it, if we didn't build the whole stack, if we didn't create the ecosystem the way we did, if we didn't dedicate ourselves to 20 years of CUDA while losing money most of that time—if we didn't do it, nobody else would have done it. If we didn't create all the CUDA-X libraries so that they're all domain-specific… A decade and a half ago, we pushed into domain-specific libraries because we realized that if we didn't create these domain-specific libraries, whether it's for ray tracing or image generation or even the early works of AI, these models, if we didn't create them, for data processing, structured data processing, or vector data processing, if we didn't create them, nobody would. I am completely certain of that. We created a library for computational lithography called cuLitho. If we didn't create it, nobody would have. So accelerated computing wouldn't advance the way it has if we didn't do what we did. So we should do that. We should dedicate our company, all of our might, wholeheartedly to go do that. However, the world has lots of clouds. If I didn't do it, somebody would show up. So following the recipe, the philosophy, of doing as much as needed but as little as possible—as little as possible—that philosophy exists in our company today. Everything I do, I do it with that lens. In the case of clouds, if we didn't support CoreWeave to exist, these neoclouds, these AI clouds, wouldn't exist. If we didn't help CoreWeave exist, they would not exist. If we didn't support Nscale, they wouldn't be where they are today. If we didn't support Nebius, they wouldn't be what they are today. Now they're doing fantastically. We should do as much as needed, as little as possible. So we invest in our ecosystem because I want our ecosystem to thrive. I want the architecture, and AI, to be able to connect with as many industries as possible, as many countries as possible, and make it possible for the planet to be built on AI and to be built on the American tech stack. That vision is exactly what we're pursuing.

Dwarkesh Patel: Why do you go out of your way not to pick winners?

Jensen Huang: Because it's not our job to, number one. Number two, when Nvidia first started, there were 60 3D graphics companies. We are the only one that survived. If you would have taken those 60 graphics companies and asked yourself which one was going to make it, Nvidia would be at the top of that list not to make it. Nvidia's graphics architecture was precisely wrong. It's not a little bit wrong. We created an architecture that was precisely wrong, and it was an impossible thing for developers to support. It was never going to make it. We reasoned about it from good first principles, but we ended up with the wrong solution. Everybody would have counted us out. And here we are. So I have enough humility to recognize that. Don't pick winners. Either let them all take care of themselves, or take care of all of them.

Dwarkesh Patel: Why not just do high bidder?

Jensen Huang: Because it's a bad business practice. You set your price and then people decide to buy it or not. I understand that others in the chip industry change their prices when demand is higher, but we just don't. That's just never been a practice of ours. You can count on us. I prefer to be dependable, to be the foundation of the industry. You don't need to second-guess. If I quoted you a price, we quoted you a price. That's it.

Jensen Huang: One of the things you can count on with Nvidia is that this year, Vera Rubin is going to be incredible. Next year, Vera Rubin Ultra will come. The year after that, Feynman will come. Every single year you can count on us. You're going to have to go find another ASIC team in the world—pick your ASIC team—where you can say, "I can bet the farm, I can bet my entire business that you will be here for me every single year. Your token cost will decrease by an order of magnitude every single year. I can count on it like I can count on the clock." For no other foundry in history can you possibly say that. You can say that about Nvidia today.

---

**00:57:36 – Should we be selling AI chips to China?**

Dwarkesh Patel: I want to ask about China. One way to think about it is, Anthropic actually announced a couple days ago Mythos Preview. This model Mythos, they're not even releasing publicly because they say it has such cyber-offensive capabilities that we don't think the world is ready until we make sure these zero-days are patched up. But they say it found thousands of high-severity vulnerabilities across every major operating system, every browser. It found one in OpenBSD, which is this operating system that's been specifically designed to not have zero days. It found one that's existed for 27 years. So if Chinese companies and Chinese labs and the Chinese government had access to the AI chips to train a model like Claude Mythos with these cyber-offensive capabilities and run millions of instances of it with more compute, the question is, is that a threat to American companies, to American national security?

Jensen Huang: First of all, Mythos was trained on fairly mundane capacity, and a fairly mundane amount of it. By an extraordinary company. The amount of capacity and the type of compute it was trained on is abundantly available in China. So you just have to first realize that chips exist in China. They manufacture 60% of the world's mainstream chips, maybe more. It's a very large industry for them. They have some of the world's greatest computer scientists. As you know, most of the AI researchers in all of these AI labs are Chinese. They have 50% of the world's AI researchers. So the question is, considering all the assets they already have—they have an abundance of energy, they have plenty of chips, they've got most of the AI researchers—if you're worried about them, what is the best way to create a safe world? Victimizing them, turning them into an enemy, likely isn't the best answer. They are an adversary. We want the United States to win. But I think having a dialogue and having research dialogue is probably the safest thing to do. This is an area that is glaringly missing because of our current attitude about China as an adversary. It is essential that our AI researchers and their AI researchers are actually talking. It is essential that we try to both agree on what not to use the AI for.

Dwarkesh Patel: Since there are a lot of things, let me just triage the response. I think the concern, going back to the flop difference in the hacking, is yes, they have compute, but there's some estimates that because they're at 7nm—they don't have EUVs because of chip-making export controls—the amount of flops they're able to actually produce, they have one tenth the amount of flops that the US has. So with that, could they eventually train a model like Mythos? Yes. But the question is, because we have more flops, American labs are able to get to these levels of capabilities first. Because Anthropic got to it first, they say, "Okay, we're going to hold onto it for a month while all these American companies, we'll give them access to it. They're going to patch up all their vulnerabilities, and now we release it."

Jensen Huang: We should always be first and we should always have more. But in order for that outcome you described to be true, you have to take it to the extremes. They have to have no compute. If they have some compute, the question is how much is needed? The amount of compute they have in China is enormous. You're talking about the country that is the second largest computing market in the world. If they want to aggregate their compute, they've got plenty of compute to aggregate.

Jensen Huang: The amount of energy they have is incredible. AI is a parallel computing problem, isn't it? Why can't they just put 4x, 10x, as many chips together because energy's free? They have so much energy. They have datacenters that are sitting completely empty, fully powered. You know they have ghost cities, they have ghost datacenters too. They have so much infrastructure capacity. If they wanted to, they just gang up more chips, even if they're 7nm. Their capacity of building chips is one of the largest in the world. The semiconductor industry knows that they monopolize mainstream chips. They have over-capacity, they have too much capacity. So the idea that China won't be able to have AI chips is completely nonsense. Now, of course, if you ask me, would the United States be further ahead if the entire world had no compute at all? But that's just not an outcome. That's not a scenario that's true. They have plenty of compute already.

Jensen Huang: 7nm chips are essentially Hopper. The ability for Hopper… I've got to tell you, today's models are largely trained on Hopper, Hopper generation. So 7nm chips are plenty good. The abundance of energy is their advantage.

Dwarkesh Patel: Comparing AI to anything that you just mentioned is lunacy.

Jensen Huang: Comparing AI to anything that you just mentioned is lunacy.

Dwarkesh Patel: But AI is similar to enriched uranium, right? It can have positive uses, it can have negative uses. We still don't want to send enriched uranium to other countries.

Jensen Huang: It's a lousy analogy. It's an illogical analogy. The way to solve that problem is to have dialogues with the researchers and dialogues with China, and dialogues with all the countries to make sure that people don't use technology in that way. We also need to make sure that the United States is ahead, that Vera Rubin, Blackwell, is available in the United States in abundance, mountains of it. We ought to stay ahead. However, we also have to recognize that AI is not just a model. AI is a five-layer cake. The AI industry matters across every single layer, and we want the United States to win at every single layer, including the chip layer. Conceding the entire market is not going to allow the United States to win the technology race long-term in the chip layer, in the computing stack. That is just a fact.

Jensen Huang: The single most important thing to our company is the richness of our ecosystem, which is about developers. 50% of the AI developers are in China. The United States should not give that up.

Jensen Huang: The day that DeepSeek comes out on Huawei first, that is a horrible outcome for our nation.

Jensen Huang: We shouldn't concede it. If we lose it, we lose it. But why do we concede it? Nobody is advocating all or nothing. We should always have the best technology here. We should always have the most technology here, and the first. But we should also try to compete and win around the world. Both of those things can simultaneously happen. It requires some amount of nuance, some amount of maturity instead of absolutes.

Jensen Huang: Now, the policies that you're advocating resulted in the American telecommunications industry being policied out of basically the world, to the point where we don't control our own telecommunications anymore. I don't see that as smart. It's a little narrow-minded, and it led to unintended consequences that I'm describing to you right now.

---

**01:35:06 – Why doesn't Nvidia make multiple different chip architectures?**

Dwarkesh Patel: We were discussing earlier these bottlenecks at TSMC and memory and so forth. So if we're in this world where you're already the majority of N3—and at some point you'll be N2 and you'll be a majority of that—do you see that you could go back to N7, the spare capacity at an older process node, and say, "Hey, the demand for AI is so great and our capacity to expand the leading edge is not meeting it, so we're going to make a Hopper or Ampere, but with everything we know about numerics today and all the other improvements you described"? Do you see that world happening before 2030?

Jensen Huang: It's not necessary to. The reason for that is because with every generation, the architecture is more than just the transistor scale. You're doing so much engineering and packaging and stacking, and the numerics and the system architecture. When you run out of capacity, to easily go back to another node… That's a level of R&D that no one could afford. We could afford to lean forward. I don't think we could afford to go back. Now, if the world simply says… If on that day we go, "Listen, we're just never going to have more capacity ever again." Would I go back and use 7nm? In a heartbeat, of course I would.

Dwarkesh Patel: One question somebody I was talking to had is, why doesn't Nvidia run multiple different chip projects at the same time with totally different architecture? So you could do something like a Cerebras-style wafer scale. You could do a Dojo-style huge package. You could do one without CUDA. You have the resources and the engineering talent to do all of these in parallel. So why put all the eggs in one basket, given who knows where AI might go and architectures might go?

Jensen Huang: Oh, we could. It's just that we don't have a better idea. We could do all of those things. It's just not better. We simulate it all in our simulator, provably worse. So we wouldn't do it. We're working on exactly the projects that we want to work on. If the workload were to change dramatically—and I don't mean the algorithms, I actually mean the workload, and that depends on the shape of the market—we may decide to add other accelerators. For example, recently we added Groq, and we're going to fold Groq into our CUDA ecosystem. We're doing that now because the value of tokens has gone up so high that you could have different pricing of tokens. Back in the old days, just a couple years ago, tokens were either free or barely expensive. But now you can have different customers, and those customers want different answers. Because the customers make so much money—for example, our software engineers—if I can give them much more responsive tokens so that they're even more productive than they are today, I would pay for it. But that market has only recently emerged. So I think we now have the ability to have the same model, based on the response time, have different segments. That's the reason why we decided to expand the Pareto frontier and create a segment of inference that is faster response time, even though it's lower throughput. Until now, higher throughput is always better. We think there could be a world where there could be very high ASP tokens, and even though the throughput is lower in the factory, the ASPs make up for it.

Dwarkesh Patel: Alright, final question. Suppose the deep learning revolution didn't happen. What would Nvidia be doing?

Jensen Huang: Accelerated computing, the same thing we've been doing all along. The premise of our company is that Moore's law is going to… General purpose computing is good for a lot of things, but for a lot of computation it's not ideal. So we combined an architecture called a GPU, CUDA, to a CPU, so that we can accelerate the workload of the CPU. Different kernels of code or algorithms could be offloaded onto our GPU. As a result, you speed up an application by 100x, 200x. Where can you use that? Obviously engineering and science and physics, data processing, computer graphics, image generation, all kinds of things. Even if AI doesn't exist today, Nvidia would be very, very large. The reason for that is fairly fundamental, which is that the ability for general purpose computing to continue to scale has largely run its course. And the only way… Not the only way, but the way to do that is through domain-specific acceleration. One of the domains that we started with was computer graphics, but there are many other domains. There's all kinds. Particle physics and fluids, structured data processing, all kinds of different types of algorithms that benefit from CUDA. Our mission was really to bring accelerated computing to the world and advance the type of applications that general purpose computing can't do, and scale to the level of capability that helps break through certain fields of science. Some of the early applications were molecular dynamics, seismic processing for energy discovery, image processing of course, all of those kinds of fields where general purpose computing is just simply too inefficient to do so. If there were no AI, I would be very sad. But because of the advances that we made in computing, we democratized deep learning. We made it possible for any researcher, any scientist, anywhere, any student, to be able to access a PC or a GeForce add-in card and do amazing science. That fundamental promise hasn't changed, not even a little bit. I know that AI is very interesting and quite exciting, but there's a lot of people doing a lot of very important work that's not AI related, and tensors are not the only way that you compute it. We want to help everybody.

Dwarkesh Patel: Jensen, thank you so much.

Jensen Huang: You're welcome. I enjoyed it.

Dwarkesh Patel: Me too.

---

## 2. 英語（整形版）

> ※ 原文と同内容。上記セクション1を参照。話者ラベルを整理したバージョン。内容は省略。

---

## 3. 日本語訳（全文）

**00:00:00 – Nvidiaの最大の競争優位性は、希少なサプライチェーンの掌握にあるのか？**

ドワルケシュ・パテル
多くのソフトウェア企業の評価額が急落しています。AIがソフトウェアをコモディティ化すると見込まれているからです。単純な見方をすれば、こうなります。NvidiaはGDS2ファイル（半導体の設計データ）をTSMCに送る。TSMCがロジックダイとスイッチを製造し、SK Hynix・Micron・SamsungのHBM（高帯域幅メモリ）と合わせてパッケージングする。それを台湾のODMに送ってラックに組み上げる。Nvidiaは本質的に、他社が製造するソフトウェアを作っているに過ぎない。ソフトウェアがコモディティ化するなら、Nvidiaもコモディティ化するのではないか？

ジェンセン・フアン
結局のところ、電子をトークンへと変換するものが必要です。電子をトークンへ変換し、そのトークンの価値を時間とともに高めていく作業は、完全にコモディティ化することは難しい。電子からトークンへの変換は、驚異的なプロセスです。トークンを生み出すことは、ある分子を別の分子より価値高くすることと同じ——あるトークンを別のトークンより価値高くすることと同じです。そのトークンを価値あるものにするために注ぎ込まれる芸術性・工学・科学・発明の量は、まさに今リアルタイムで目の当たりにしている通りです。変換のプロセス、製造、そこに込められたあらゆる科学は、深く理解されるには程遠く、その旅もまだ終わっていません。コモディティ化が起きるとは思えない。もちろん効率化は進めていきます。あなたが質問の枠組みとして示したものは、まさに私自身の会社に対するメンタルモデルと同じです。インプットは電子、アウトプットはトークン。その中間にNvidiaがある。私たちの仕事は、その変換を卓越した能力で実現するために、必要な分だけ関与し、できる限り少なくする、ということです。「できる限り少なく」とはどういう意味か——私がやらなくていいことは、誰かとパートナーを組んでエコシステムの一部にする。今日のNvidiaを見れば、おそらく世界最大のパートナーエコシステムを持っています。上流・下流のサプライチェーン、あらゆるコンピュータ企業、アプリケーション開発者、モデル開発者、すべてです。AIは、いわば5層のケーキです。私たちはその全5層にわたるエコシステムを持っている。できる限り少なく関与しようとしていますが、私たちが担わなければならない部分は、結果的に恐ろしく難しい領域です。そこがコモディティ化するとは思いません。ソフトウェア企業もツールメーカーもコモディティ化するとは思わない。今日のソフトウェア企業の多くはツールメーカーです。たとえばExcelはツールで、PowerPointはツール、CadenceもSynopsysもツールをつくる。私は人々とは逆の方向が見えています。エージェントの数は指数関数的に増え、ツールのユーザー数も指数関数的に増えると思う。Synopsys Design Compilerのインスタンス数が急騰し、フロアプランナーやレイアウトツール、デザインルールチェッカーを使うエージェントも増えていくでしょう。今は技術者の数に制限されている。明日には、その技術者たちが多数のエージェントにサポートされるようになる。これまで見たことのない形で設計空間を探索するようになり、今使っているツールをそのまま使い続けるでしょう。ツールの使用がソフトウェア企業を急成長させると私は思う。まだそうなっていない理由は、エージェントがまだツールを使うのに十分なレベルに達していないからです。これらの企業がエージェントを自前で構築するか、エージェントがそのツールを使えるほど賢くなるか——おそらくその両方の組み合わせになるでしょう。

ドワルケシュ・パテル
最新の開示によると、Nvidiaはファウンドリやメモリ、パッケージングに対してほぼ1000億ドルの購買コミットメントを持っているとのこと。SemiAnalysisは2500億ドルに達するとも報告しています。一つの解釈は、Nvidiaの競争優位性の本質は、何年分もの希少部品を押さえていることにある、というものです。他社もアクセラレータを持てるかもしれないが、それを組み上げるためのメモリやロジックを実際に調達できるのか？これが今後数年のNvidiaにとっての最大の堀なのでしょうか？

ジェンセン・フアン
それは、他社には難しい私たちにできることの一つです。上流に対して巨大なコミットメントを行っています。その一部はあなたが言及したような明示的なコミットメント。一部は暗黙的なものです。たとえば、上流の多くの投資は私たちのサプライチェーンが自ら行っています。なぜなら私がそのCEOたちに言ったからです——「この業界がどれだけ大きくなるか話しましょう、なぜそうなるかを説明しましょう、一緒に論理的に考えましょう、私が見えているものをお見せしましょう」と。情報を伝え、鼓舞し、上流のさまざまな業界のCEOたちと方向性を合わせるそのプロセスの結果として、彼らは投資に踏み切る意欲を持つのです。なぜ他の誰かのためではなく、私のために投資するのか？それは、私がそのサプライを購入して下流に売り切る能力を持っていることを、彼らが知っているからです。Nvidiaの下流サプライチェーンと下流需要があまりに大きいため、上流でも投資する意欲が生まれる。GTCを見れば、その規模と参加者の多さに誰もが驚きます。360度すべて、AIの全宇宙が一堂に会する場です。みんなが一堂に会するのは、互いを必要としているからです。下流が上流を見られるよう、上流が下流を見られるよう、そしてすべての人がAIの進展を見られるよう、私がまとめている。私は時間の多くを、サプライチェーン・パートナー・エコシステムに対して、目の前にある機会を伝えることに使っています。「ジェンセン、あなたのキーノートはいつも教育のような部分がある」とよく言われます。まさにその通りです。サプライチェーン全体が——何が来るのか、なぜ来るのか、いつ来るのか、どれほど大きくなるのか——理解していることを確かめなければならない。あなたが言う「堀」について言えば、私たちは未来のために構築できる。今後数年がトリリオンドル規模になるとすれば、私たちにはそのサプライチェーンがある。私たちの広がりがなければ、ビジネスのベロシティがなければ——キャッシュフローがあるように、サプライチェーンフローがある。アーキテクチャのビジネスチャーンが低ければ、誰もそのためにサプライチェーンを構築しない。私たちがこのスケールを維持できるのは、下流需要がそれほど大きいからです。

ドワルケシュ・パテル
何年もの間、Nvidiaは前年比で収益を2倍にしてきた。世界に提供するフロップス（演算性能）は毎年3倍以上に増えている。

ジェンセン・フアン
今のこのスケールで2倍というのは、本当に驚異的なことですよ。

ドワルケシュ・パテル
まさに。でもロジックを見ると、NvidiaはTSMCのN3ノードの最大顧客で、N2でも最大クラスです。SemiAnalysisによれば、AI全体が今年はN3の60%を占め、来年は86%になる。大多数を占めているのに、どうやって2倍にするのか。今やAIコンピューティングの成長率は上流の制約から鈍化せざるを得ない局面にあるのか。毎年2倍のEUV装置をどう確保するのか？

ジェンセン・フアン
ある時点では、瞬間的な需要が世界中のサプライを超えています。どの瞬間も、配管工の数に制限されることがある——実際にそれが起きています。

ドワルケシュ・パテル
配管工は来年のGTCに招待されますね。

ジェンセン・フアン
それは名案です。でもそれは良い状態なんですよ。瞬間的な需要が業界の総供給を上回っている業界——これが理想です。もし差が開きすぎたら、特定のコンポーネントが大きく遅れたら、業界はそこに集中砲火を浴びせます。たとえば、今はCoWoSについてあまり話題に上らなくなっているでしょう。2年間、文字通りあらゆるリソースを投入したからです。何度も何度も倍増させた。今はかなり良い状態だと思います。TSMCはCoWoSの供給をロジック需要やメモリ需要に合わせて維持しなければならないと今では分かっている。長い間CoWoSとHBMメモリはニッチな存在でした。でももはやニッチではない。メインストリームのコンピューティング技術だと誰もが認識している。AI革命の始まりに、私が今言っていることを5年前にも言っていた。信じて投資した人もいた。たとえばSanjayとMicronのチームです。LPDDRとHBMメモリにわたってパートナーシップを組み、彼らは本当に投資した。今では数年先のボトルネックをプリフェッチしている。たとえばLumentum、Coherent、シリコンフォトニクスエコシステムへのここ数年の投資がサプライチェーンを大きく再編しました。TSMCを中心にサプライチェーン全体を構築した。COUPE（先進封止技術）でパートナーシップを組み、大量の技術を発明し、そのパテントをサプライチェーンにライセンスしてオープンに保っています。新技術・新ワークフロー・両面プロービングのような新検査装置の発明、企業への投資、キャパシティ拡大の支援——こうしてサプライチェーンがスケールを支えられる準備を整えています。

ドワルケシュ・パテル
ボトルネックにも易しいものと難しいものがあるようですね。

ジェンセン・フアン
ちなみに私は一番難しいものを挙げましたよ。それは配管工です。配管工と電気工。これは、仕事の終わりを語るドゥーマーたちへの懸念のひとつです。ソフトウェアエンジニアを目指す人を諦めさせれば、ソフトウェアエンジニアが不足する。10年前にも同じ予測がありました。「何があっても放射線科医にはなるな」と言われていた。では今何が不足しているか？放射線科医です。

ドワルケシュ・パテル
毎年2倍のロジックを実際にどうやって製造するのか。最終的にはメモリもロジックもEUVがボトルネックになる。

ジェンセン・フアン
2〜3年以内に素早くスケールすることは不可能ではありません。必要なのは需要のシグナルだけです。一つ作れたら10個作れる。10個作れたら100万個作れる。どのボトルネックも2〜3年以上続くものはないということです。一方で私たちはコンピューティング効率を10倍・20倍、HopperからBlackwellに至っては30〜50倍も改善しています。CUDAが柔軟だからこそ新しいアルゴリズムが生まれる。心配なのは私たちの下流にあるものです——エネルギー政策。エネルギーなしに産業は作れない。チップキャパシティの拡大は2〜3年の問題。CoWoSキャパシティも2〜3年の問題。

---

**00:16:25 – TPUはNvidiaのAIコンピューティング支配を崩すか？**

ドワルケシュ・パテル
競合他社について聞かせてください。TPUを見ると、世界トップ3のモデルのうち2つ——ClaudeとGemini——はTPU上で訓練されています。これはNvidiaの将来にとって何を意味しますか？

ジェンセン・フアン
私たちは全く異なるものを作っています。Nvidiaが構築したのはアクセラレーテッド・コンピューティングであって、テンソル処理ユニット（TPU）ではありません。アクセラレーテッド・コンピューティングはあらゆる用途に使われます——分子動力学、量子色力学、データ処理、流体力学、素粒子物理学。そしてAIにも使われる。Nvidiaは汎用コンピューティングからアクセラレーテッド・コンピューティングへという、コンピューティングのあり方そのものを再発明しました。私たちの市場範囲は、いかなるTPUやASICよりもはるかに広い。私たちのコンピュータは他の人が運用できるように設計されているので、オペレーターであれば誰でも購入できる。だからGoogle・Amazon・Azure・OCIを含むすべてのクラウドに入っている。NvidiaはCUDAを、素晴らしいテンソル処理ユニットとしても機能するよう構築しましたが、データ処理・コンピューティング・AIのあらゆるライフサイクルにも対応しています。私たちの市場機会はずっと大きく、リーチははるかに広い。

ドワルケシュ・パテル
AIとは何か——ひたすら予測可能な行列積の繰り返しです。ワープスケジューラやスレッドとメモリバンクの切り替えにダイ面積を割く必要はない。TPUはまさに今オンラインになっているコンピューティングの収益・ユースケース成長の大部分に最適化されている。

ジェンセン・フアン
行列積はAIの重要な部分ですが、それだけではありません。新しいアテンション機構を考案したい、ハイブリッドSSMのようなまったく新しいアーキテクチャを発明したいなら——汎用的にプログラム可能なアーキテクチャが必要です。プログラマブルなシステムだから、新しいアルゴリズムの発明がずっとしやすい。新しいアルゴリズムを発明できることこそが、AIをこれほど速く進歩させている本質です。TPUもMoore's Lawの影響を受けており、年間約25%の向上です。10倍・100倍の飛躍を本当に実現するには、毎年アルゴリズムとその計算方法を根本的に変えるしかない。それがNvidiaの根本的な優位性です。BlackwellがHopperより50倍というのも——Moore's Lawだけでは合理的にそれはできません。MoEのような新しいモデルで、並列化・分解・コンピューティングシステム全体への分散によって実現しています。私たちのアーキテクチャのプログラマビリティと、NVLinkのようなファブリック自体やSpectrum-Xのようなネットワークにも一部の計算をオフロードできるという事実の組み合わせです。

ドワルケシュ・パテル
収益の60%はビッグ5のハイパースケーラーからです。これらのハイパースケーラーは独自のカーネルを書く能力がある。AnthropicやGoogleは主にTPU・Trainiumで動かしています。OpenAIでさえTritonを持っており、CUDAの代替を構築できる。主要顧客の多くがCUDAの代替を構築できるとしたら、CUDAは本当にフロンティアAIをNvidia上で実現させるものと言えますか？

ジェンセン・フアン
CUDAは豊かなエコシステムです。どのコンピュータで最初にビルドするにしても、まずCUDA上で構築するのは非常に賢明です。私たちはTritonのバックエンドに膨大なNvidia技術を提供しています。フレームワークはたくさんあります——Triton、vLLM、SGLang、verl、NeMo RL。ポストトレーニングと強化学習の分野全体が今爆発しています。開発者にとって最も重要なのはインストールベースです。NvidiaのCUDAエコシステムは、今や数億台のGPUが出回っている。すべてのクラウドに入っています。ロボティクス企業なら、CUDAスタックがロボット自体の中で動いてほしい。私たちは文字通りどこにでもいます。エコシステムの豊かさ、インストールベースの広さ、存在する場所の多様性——この組み合わせがCUDAを不可欠なものにしています。

ジェンセン・フアン
NvidiaのGPUはF1マシンです。誰でも時速100マイルで走れると思いますが、限界まで引き出すにはかなりの専門知識が要る。私たちのスタック最適化によって、AIラボのモデルが3倍・2倍・50%速くなることは珍しくありません。NvidiaのコンピューティングスタックはTCO（総所有コスト）あたりパフォーマンスで世界最高です。断言します。DylanのInferenceMAXが公開されているが、TPUもTrainiumも来ない。MLPerfでTrainiumは来ない。私たちがこれほど成功している理由は、単純にTCOが非常に優れているからです。

ジェンセン・フアン
Anthropicは固有の事例であってトレンドではありません。Anthropicなしで、TPUの成長が存在するでしょうか？100%Anthropicによるものです。Anthropicなしで、Trainiumの成長があるでしょうか？100%Anthropicです。ASICのマージンも私の知る限り65%と非常に高い。Nvidiaのマージン70%と比べてどれだけ節約できているのか？私のミスは、VCがAnthropicになるという期待のもと50〜100億ドルをAIラボに投資することは絶対にないという事実を、深く内在化できていなかったことです。同じ間違いは二度としません。

---

**00:41:06 – Nvidiaはなぜハイパースケーラーにならないのか？**

ドワルケシュ・パテル
OpenAIに最大300億ドル、Anthropicに100億ドルを出資したと報じられています。何年もの間、あなたたちは彼らにコンピュートを提供し、その行く先を見通していた。なぜもっと早くやらなかったのか？

ジェンセン・フアン
できるようになった時点でやりました。当時、私たちには資金調達の感覚がなかった。VCから資金調達すればいいだけじゃないかと思っていましたから。でも彼らがやろうとしていたことは、VCではできなかった。それが彼らの天才性です。Anthropicの存在は世界にとって素晴らしいことです。

ドワルケシュ・パテル
なぜNvidiaはクラウド事業者にならないのか？自らハイパースケーラーになって、このコンピュートを貸し出せばいい。

ジェンセン・フアン
会社の哲学として——「必要なだけやる、でも最小限で」。コンピューティングプラットフォームの構築は、私たちがやらなければ誰もやらない。20年間赤字を出しながらCUDAに専念した。cuLithoも私たちが作らなければ誰も作らなかった。一方で、世界にはクラウドがたくさんある。私がやらなくても、誰かがやります。CoreWeave・Nscale・Nebiusを支えなければ、これらのネオクラウドは生まれなかったでしょう。「必要なだけ、でも最小限で」——エコシステムに投資するのは、エコシステムに繁栄してほしいからです。地球全体がAIの上に構築され、アメリカのテックスタックの上に構築されることを可能にしたい。

ジェンセン・フアン
なぜ勝者を選ばないか——Nvidiaが創業した頃、3Dグラフィックス企業は60社ありました。生き残ったのは私たちだけです。あの60社の中から生き残りを予想してみれば、Nvidiaは最も可能性が低いリストの上位に来たでしょう。Nvidiaのグラフィックスアーキテクチャは根本的に間違っていた。それでも、今こうして存在している。だから私は十分な謙虚さを持って認識しています。勝者を選ばない。全員に自立させるか、全員の面倒を見るか。

ジェンセン・フアン
先着順です。POを出さなければならない。発注さえしていただければ、最大限のキャパシティを確保するよう努めます。「ラリーとイーロンが夕食でGPUを懇願した」という記事——そんなことはありませんでした。ただ発注すればいいだけです。

ジェンセン・フアン
価格を設定して、それを見て買うか買わないか決める——これが基本です。私は業界の基盤でありたい。今年Vera Rubinが来る、来年はVera Rubin Ultraが来る、その次はFeynmanが来る——毎年、確実に届けます。世界中でASICチームを選んで「毎年必ず来てくれる、トークンコストは毎年桁違いに下がる」と言えるチームはない。NvidiaとTSMCについては言えます。

---

**00:57:36 – AIチップを中国に売るべきか？**

ドワルケシュ・パテル
AnthropicのMythos Previewは、主要OS全体を横断した数千件の高深刻度のゼロデイ脆弱性を発見しました——OpenBSDに27年間存在したものも含めて。中国がより多くのチップにアクセスできたなら、同様のモデルでアメリカへのサイバー攻撃が可能になるのではないか？

ジェンセン・フアン
Mythosが訓練に使ったのは、中国にすでに存在する平凡なキャパシティです。中国には豊富なエネルギーがあり、Huaweiは過去最高の年を記録した。世界のAI研究者の50%が中国にいます。問題は彼らにチップを売るかどうかではなく、いかに安全な世界を作るか——対立的な孤立ではなく、対話を通じて。米国のAI研究者と中国のAI研究者が実際に対話することが不可欠です。

ジェンセン・フアン
中国が保有するコンピュートの量は膨大です。世界第2位のコンピューティング市場の国の話をしているんです。彼らが集約しようとすれば、集約できるコンピュートは十分にある。AIは並列コンピューティングの問題です。エネルギーがタダ同然なら、7nmチップを4倍・10倍並べればいい。7nmチップは実質的にHopperです。今日のモデルの多くはHopper世代で訓練されています。豊富なエネルギーが彼らの優位性です。

ジェンセン・フアン
AIを濃縮ウランと比較するのは狂気の沙汰です。お粗末なアナロジーです。AI開発者の50%が中国にいる。米国はそれを手放すべきではありません。DeepSeekがHuawei上で最初に登場する日は、我が国にとって最悪の結果です。放棄すべきではない。失うかもしれない、でもなぜ自ら譲り渡すのか？米国は常に先行すべきですが、同時に世界規模で競い勝つべきです。この二つは同時に実現できる。絶対論ではなく、ある程度の繊細さと成熟が必要です。

ジェンセン・フアン
あなたが主張するような政策の結果、アメリカの通信産業が事実上世界市場から排除され、今や我々は自国の通信すら支配していません。賢い選択とは言えなかった。

---

**01:35:06 – NvidiaはなぜBultipleの異なるチップアーキテクチャを作らないのか？**

ドワルケシュ・パテル
Cerebras流のウェーハスケール、Dojo流の巨大パッケージ、CUDAなしのもの——そういうものを並行して進めるリソースもエンジニアリングの人材もあるはずです。なぜ一つのカゴに全卵を入れるのですか？

ジェンセン・フアン
やろうと思えばできます。ただ、それより良いアイデアがないだけです。シミュレーターで全部試していて、証明できる形で劣っています。最近GroqをCUDAエコシステムに統合しようとしています。トークンの価値が非常に高くなり、レスポンスタイムという軸でPareto frontierを広げ、スループットは低くても応答速度が速い推論セグメントを作ることができる。

ドワルケシュ・パテル
仮にディープラーニング革命が起きなかったとしたら、Nvidiaは何をしていたと思いますか？

ジェンセン・フアン
アクセラレーテッドコンピューティング、ずっとやってきたこととまったく同じです。汎用コンピューティングは多くのことに向いているが、多くの計算処理には最適ではない。私たちはGPUとCUDAというアーキテクチャをCPUと組み合わせることで、CPUのワークロードを加速できるようにした。アプリケーションを100倍、200倍高速化できる。仮に今日AIが存在しなくても、Nvidiaは非常に大きな会社になっていたでしょう。汎用コンピューティングがスケールし続ける能力は、ほぼ限界に来ている。私たちがコンピューティングで達成した進歩によって、ディープラーニングを民主化しました。どんな研究者も、どんな学生でも、PCやGeForceのアドインカードにアクセスして素晴らしい科学ができるようにした。その根本的な約束は、今も微塵も変わっていません。

ドワルケシュ・パテル
ジェンセン、どうもありがとうございました。

ジェンセン・フアン
どういたしまして。楽しかったです。

ドワルケシュ・パテル
私もです。

---

## 4. 日本語（要点まとめ）

### テーマ1：サプライチェーンの堀（00:00:00）

- Nvidiaのビジネスモデルは「電子をトークンへ変換する中間者」。インプット＝電子、アウトプット＝トークン
- 購買コミットメント約1000億〜2500億ドルで何年分もの希少部品（TSMC N3/N2、HBM、CoWoS）を確保
- 堀の本質は「価格」や「部品数」ではなく、上流CEOに対して業界の未来を語り、投資判断を動かす影響力
- 「需要が供給を超えているのが良い状態。CoWoSは2年で解決済み。次のボトルネックも2〜3年で解決できる」
- 真の長期ボトルネックはチップではなくエネルギー政策と配管工（現場インフラ人材）

### テーマ2：TPU競争（00:16:25）

- NvidiaはTPUではなく「アクセラレーテッド・コンピューティング」。行列積以外の分子動力学・流体力学・量子化学にも対応
- 「HopperからBlackwellで50倍」→ Moore's Lawだけでは不可能。CUDAの柔軟性＋アルゴリズム革新（MoE等）で実現
- CUDAの価値＝①エコシステムの豊かさ ②数億台のインストールベース ③全クラウド対応
- 「Anthropicのコンピュートが非Nvidiaに移っている」という前提を否定：「AnthropicなしにTPU成長はない。TPU成長＝Anthropic一社」
- F1カーのアナロジー：GPUは誰でも時速100マイルで走れるが、限界を引き出すには専門知識が必要
- TCO（総所有コスト）あたりパフォーマンスは世界最高。「MLPerfにTPU・Trainiumは来ない」

### テーマ3：ハイパースケーラー戦略（00:41:06）

- 哲学：「必要なだけやる、でも最小限で（Do as much as needed, as little as possible）」
- クラウドは誰かがやる。CUDA・NVLink・cuLithoは誰もやらない → だから自分たちがやる
- CoreWeave・Nscale・Nebiusへの投資はエコシステムを生かすための最小限の支援
- 「なぜ勝者を選ばないか」→ NvidiaもかつてはAGRE（全60社中の一つ）。誰が予測できた？謙虚さの証
- PO（発注書）が来なければ話にならない。基本は先着順。最高値入札は絶対にやらない（「業界の基盤でありたい」）
- 毎年新アーキテクチャを確実に届ける：Vera Rubin → Vera Rubin Ultra → Feynman → ～

### テーマ4：中国輸出規制（00:57:36）

- Mythosが訓練に使ったコンピュートは中国にすでに存在する
- 中国のAI開発能力：世界のAI研究者の50%、豊富なエネルギー、7nm≒Hopper、Huawei過去最高年
- 「AIをウランと比較するのは狂気の沙汰」。解決策は対話であって孤立ではない
- 最大のリスク：「DeepSeekがHuawei上で最初に登場する日が来ること」
- 過去の教訓：通信産業の輸出規制で米国は世界市場を失い、今や自国通信も支配できていない
- 「放棄すべきではない。失うかもしれない、でもなぜ自ら譲り渡すのか？」

### テーマ5：チップアーキテクチャ（01:35:06）

- 複数アーキテクチャを試さない理由：シミュレーターで全て試済み。証明できる形で劣る
- 例外：Groqを取り込んでCUDAエコシステムへ統合中。理由は「プレミアムトークン市場」の出現
- Pareto frontierの拡張：高スループット ← 従来型 vs 高レスポンス（低スループット） ← 新市場
- AIがなかったとしても：分子動力学・地震探査・画像処理・流体力学でNvidiaは巨大企業になっていた
- 「ディープラーニングを民主化した」：GeForce一枚で誰でもどこでも研究できる状態を作った

---

## 5. 知っておくべき知識・単語の解説

### 半導体・製造

| 用語 | 解説 |
|------|------|
| **GDS2ファイル** | 半導体チップの物理的なレイアウト設計データ（Graphic Design System 2）。Nvidiaがチップを設計し、このファイルをTSMCに送って製造を委託する |
| **TSMC（台湾積体電路製造）** | 世界最大のファウンドリ（半導体受託製造）企業。N3（3nm）・N2（2nm）が最先端ノード |
| **N3 / N2 / N7** | TSMCのプロセスノード（チップ製造世代）。数字が小さいほど最先端。N7＝7nm（旧世代）、N3＝3nm（現行最先端）。Nvidiaは現在N3の60%超を占める |
| **EUV（極端紫外線）** | 最先端半導体製造に必要な露光装置の技術。ASML（オランダ）のみが製造。中国はEUV装置の輸出規制により入手不可 |
| **ASML** | EUV露光装置の世界唯一のメーカー（オランダ）。半導体製造の最重要サプライヤー |
| **HBM（High Bandwidth Memory）** | 高帯域幅メモリ。AIチップのトレーニング・推論に必要な超高速メモリ。SK Hynix・Micron・Samsungが製造。最新はHBM3E |
| **CoWoS（Chip on Wafer on Substrate）** | TSMCが提供する先進パッケージング技術。複数のチップを一枚の基板上で超高密度に接続する。NvidiaのGPU+HBMのパッケージに使用 |
| **ODM（Original Design Manufacturer）** | 受託製造業者。台湾のHon Hai（フォックスコン）等がNvidiaのサーバーラック組み立てを担当 |
| **LPDDR** | 低消費電力DDRメモリ（Low Power Double Data Rate）。モバイルやエッジAIデバイスに使用 |
| **SMIC** | 中国最大のファウンドリ。EUV装置なしで7nmの量産に成功したとされる（技術的には批判もあり） |
| **Huawei 910C（昇騰910C）** | HuaweiのAI向けアクセラレータ。EUVなしで製造された7nmチップ。H200と比べると性能は半分〜3分の1程度とされる |

### NvidiaのGPUアーキテクチャ世代

| 世代名 | 特徴 |
|--------|------|
| **Hopper（H100/H200）** | 2022年〜。現在も多くのデータセンターで主力。7nmノード相当 |
| **Blackwell（B100/B200）** | 2024〜2025年。Hopperより30〜50倍のエネルギー効率。NVL72構成が主力 |
| **Vera Rubin** | 2026年予定。次世代アーキテクチャ |
| **Vera Rubin Ultra** | 2027年予定 |
| **Feynman** | 2028年予定 |

### ソフトウェア・エコシステム

| 用語 | 解説 |
|------|------|
| **CUDA（Compute Unified Device Architecture）** | NvidiaのGPU向けプログラミングプラットフォーム。2006年から20年間開発。GPUで汎用計算を行うための基盤技術。現在は数億台のGPUにインストール済み |
| **CUDA-X ライブラリ** | CUDA上に構築されたドメイン固有ライブラリ群。cuDNN（深層学習）、cuBLAS（線形代数）、NCCL（集合通信）、cuLitho（計算リソグラフィー）等 |
| **cuLitho** | TSMC向けの計算リソグラフィー（半導体設計検証）加速ライブラリ。Nvidiaが開発し、業界にオープン化 |
| **NVLink** | Nvidia独自のGPU間高速インターコネクト技術。PCIeより大幅に高速。NVL72は72基のBlackwellをNVLink接続した構成 |
| **Spectrum-X** | NvidiaのAIネットワーキングプラットフォーム。イーサネットベースでAIクラスター内の通信を最適化 |
| **Triton** | OpenAIが開発したGPUカーネル向けプログラミング言語。NvidiaのCUDAよりも抽象度が高く、他のアクセラレータにもコンパイル可能 |
| **vLLM** | LLM推論の高速化ライブラリ（PagedAttention等を実装）。Nvidia GPU上での推論最適化のデファクトスタンダード |
| **SGLang** | LLMサービング最適化フレームワーク |
| **verl / NeMo RL** | 強化学習（RLHF等）向けフレームワーク。ポストトレーニング市場の急拡大に対応 |
| **InferenceMAX** | Dylan Patel（SemiAnalysis）が公開した推論コストベンチマーク。ドルあたりトークン数で比較。TPUやTrainiumは参加していない |
| **MLPerf** | ML業界のベンチマーク標準。NvidiaはMLPerfで一貫してトップ。TrainiumはMLPerfに出てこない |

### アーキテクチャ概念

| 用語 | 解説 |
|------|------|
| **TPU（Tensor Processing Unit）** | GoogleのAI専用チップ（ASIC）。行列積演算（シストリックアレイ）に特化。ClaudeとGeminiはTPUで訓練 |
| **Trainium** | AWSのAI訓練向けASIC。AnthropicはAWSからの巨額投資の見返りとしてTrainiumを使用 |
| **ASIC（Application Specific Integrated Circuit）** | 特定用途向け集積回路。TPU・Trainiumはその一種。Nvidiaの汎用GPU/アクセラレータと対比される |
| **シストリックアレイ（Systolic Array）** | 行列積演算に最適化されたハードウェア構造。データが規則的に流れる（血液循環のような動き）ためこの名前。TPUの中核技術 |
| **MoE（Mixture of Experts）** | モデルアーキテクチャの一種。全パラメータを一度に使わず、入力に応じて一部の「専門家」モデルを活性化。GPT-4・Gemini等が採用 |
| **SSM（State Space Model）** | Transformerの代替アーキテクチャ候補。Mamba等が代表例。アテンション機構を使わず、シーケンスを状態空間として処理 |
| **TCO（Total Cost of Ownership）** | 総所有コスト。購入価格だけでなく、電力・冷却・人件費・保守費を含む長期コスト。AI業界では「ドルあたりトークン数」が主要指標 |
| **Moore's Law** | 「半導体のトランジスタ数は約2年で2倍になる」というIntelのGordon Mooreが1965年に提唱した法則。現在は年率25%程度の性能向上に鈍化しており、「Mooreの法則は終わりつつある」と言われる |
| **Pareto Frontier** | 経済学・工学の概念。「一方を改善すれば他方が悪化する」限界の集合。ここでは「高スループット低レスポンス」vs「低スループット高レスポンス」のトレードオフ |
| **ASP（Average Selling Price）** | 平均販売価格。プレミアムトークン市場では低スループットでも高ASPで収益を出せる |

### 企業・人物

| 名称 | 解説 |
|------|------|
| **Dwarkesh Patel** | ポッドキャスト「Dwarkesh Podcast」の司会者。AI・科学・歴史のロングフォームインタビューで知られる。substack.comで全文書き起こし公開 |
| **Dylan Patel** | SemiAnalysis創設者。半導体サプライチェーン分析の第一人者。InferenceMAXの作者。Blackwellの「50倍性能」を独自検証 |
| **SemiAnalysis** | 半導体・AI業界の調査・分析会社。TSMCのキャパシティ配分等の独自分析で業界に影響力を持つ |
| **CoreWeave** | Nvidia投資先のネオクラウド（AI特化クラウド）。Nvidiaが63億ドルのバックストップと20億ドルの投資。2025年にIPO |
| **Crusoe** | Nvidia投資先のAIクラウド企業。Blackwell GPU搭載でClaudeのインフラとして採用 |
| **Nscale / Nebius** | Nvidiaが支援するネオクラウド企業 |
| **GTC（GPU Technology Conference）** | Nvidiaの年次技術カンファレンス。AIサプライチェーン全体が一堂に会する場として機能 |
| **Cerebras** | ウェーハ全体を一枚のチップとして使う「ウェーハスケール」AI専用チップを製造するスタートアップ |
| **Dojo** | Teslaの独自AI訓練チップ・アーキテクチャ。大型パッケージ構成 |
| **Groq** | 超高速推論に特化したASIC「LPU」を持つスタートアップ。Nvidiaが最近買収・統合を発表 |
| **DeepSeek** | 中国のAI企業。非常に効率的なオープンソースモデル（DeepSeek-R1等）でAI業界に衝撃を与えた。「少ないコンピュートで高性能」の象徴 |
| **COUPE** | NvidiaとTSMCが共同開発した先進パッケージング技術（Chip-On-wafEr）の規格 |
| **Lumentum / Coherent** | シリコンフォトニクス（光通信部品）メーカー。Nvidiaが数年前から投資し、AIデータセンターの光相互接続を整備 |
| **Anthropic Mythos** | Anthropicが開発したAIモデル（インタビュー当時未公開）。主要OS全体のゼロデイ脆弱性を大量発見できる能力を持つとされ、安全上の理由から非公開 |
| **OpenBSD** | セキュリティを最優先設計とするUNIX系OS。「ゼロデイ脆弱性がない」とされていたが、MythosはOpenBSDで27年間未発見だった脆弱性を発見した |

### ビジネス・経済概念

| 用語 | 解説 |
|------|------|
| **ハイパースケーラー（Hyperscaler）** | 超大規模クラウドプロバイダー。Google・Amazon（AWS）・Microsoft（Azure）・Meta・Oracleの5社がビッグ5。NvidiaはこれらをGPUの主要顧客として持つ |
| **ネオクラウド（Neocloud）** | AI専用の新世代クラウドプロバイダー（CoreWeave・Crusoe・Lambda等）。旧来の汎用クラウドと対比。Nvidiaが意図的に育成 |
| **CapEx / OpEx** | 資本支出（Capital Expenditure）／運営費（Operating Expenditure）。ハイパースケーラーがNvidiaのGPUを購入するのはCapEx。ラボがレンタルするのはOpEx化 |
| **PO（Purchase Order）** | 発注書。Nvidiaはどんな大物でもPOがなければ優先しない |
| **フライホイール効果** | ①豊富なインストールベース→②開発者が集まる→③エコシステムが豊かになる→④さらにインストールベースが広がる、という正のフィードバックループ |
| **コモディティ化（Commoditization）** | 製品・サービスが差別化できなくなり、価格競争になること。Jensenは「トークン生成はコモディティ化しない」と主張 |
| **チャーン（Churn）** | ビジネスの回転率・循環率。「サプライチェーンにはキャッシュフローのようにチャーンがある」——回転率が低ければ誰もサプライチェーンを構築しない |
| **ゼロデイ脆弱性（Zero-day）** | 開発者が把握していないソフトウェアの脆弱性。発見後すぐに悪用可能なため「ゼロデイ（対処時間ゼロ）」と呼ぶ |
