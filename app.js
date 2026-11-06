/**
 * 어린이 농구 기초 수비 마스터 (app.js)
 * 1:1 / 2:2 / 3:3 / 5:5 다인 경기 모드 지원
 * - 공격수: 항상 빨간색 (Red)
 * - 수비수: 파란색 (Blue)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================= 4가지 모드별 퀴즈 데이터 정의 =================
  const modeData = {
    // ---------------- 1대1 기초 모드 (10문제) ----------------
    '1v1': [
      {
        id: 1,
        title: "정면 3점슛 라인 (탑, Top)",
        shortName: "정면 3점",
        situationDesc: "빨간색 공격수가 <strong>정면 3점 라인 밖</strong>에서 골대를 향해 서 있어요!",
        attacker: { x: 300, y: 470, angle: 0, label: "공격자 (빨강)" },
        axisTarget: { x: 300, y: 470 },
        otherPlayers: [],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 360, angle: 180, label: "팔 하나 거리", isCorrect: true, feedbackTitle: "완벽한 정답이에요! 짝짝짝!", feedbackDesc: "골대와 공격수 사이 일직선에서 '팔 하나 간격'을 딱 유지했어요! 슛과 양쪽 돌파를 모두 막을 수 있어요." },
          B: { x: 300, y: 410, angle: 180, label: "바짝 붙기", isCorrect: false, feedbackTitle: "조심해요! 너무 가까워요!", feedbackDesc: "공격수 발에 너무 바짝 붙으면, 공격수가 휙 방향을 바꾸었을 때 발이 엉켜 순식간에 돌파당해요!" },
          C: { x: 300, y: 240, angle: 180, label: "멀리 서기", isCorrect: false, feedbackTitle: "아쉬워요! 너무 멀어요!", feedbackDesc: "너무 멀리 떨어져 서 있으면 공격수가 아무 방해도 받지 않고 시원하게 3점슛을 쏴버려요!" }
        },
        locationTipTitle: "정면(Top)에서의 발 모양 & 수비 요령",
        locationTipDesc: "정면에서는 공격수가 좌우 어디로든 뚫고 갈 수 있어요. 두 발을 어깨너비보다 1.5배 넓게 벌리고, 공격수를 정면으로 마주보며 양손을 활짝 펼쳐야 해요!",
        voiceScript: "정면 3점슛 라인에서는 공격수가 왼쪽과 오른쪽 어디로든 돌파할 수 있어요. 두 발을 넓게 벌리고 빨간색 공격수를 정면으로 바라보며 팔 하나 간격을 지키세요!"
      },
      {
        id: 2,
        title: "오른쪽 윙 45도 (Right Wing)",
        shortName: "우측 45도",
        situationDesc: "빨간색 공격수가 <strong>오른쪽 45도 외곽</strong>에서 골대를 향해 공격을 노리고 있어요!",
        attacker: { x: 455, y: 415, angle: -28, label: "공격자 (우측 45도)" },
        axisTarget: { x: 455, y: 415 },
        otherPlayers: [],
        correctChoice: 'A',
        choices: {
          A: { x: 380, y: 305, angle: 152, label: "중앙 차단 위치", isCorrect: true, feedbackTitle: "대단해요! 최고의 위치 선정!", feedbackDesc: "골대와 공격수 사이에서 위험한 코트 중앙(골밑) 진로를 차단하고 사이드로 유도하는 모범 발자국 각도예요!" },
          B: { x: 425, y: 355, angle: 152, label: "코앞에 붙기", isCorrect: false, feedbackTitle: "위험해요! 너무 가까워요!", feedbackDesc: "발이 너무 달라붙어 있으면 공격수의 폭발적인 첫 발 스피드를 따라가지 못해 뚫려요!" },
          C: { x: 490, y: 285, angle: 110, label: "사이드 쪽 비우기", isCorrect: false, feedbackTitle: "앗! 골밑 진로가 텅 비었어요!", feedbackDesc: "골대와 공격수 사이의 중심축을 벗어나 있어서 공격수가 골밑으로 곧장 직진할 수 있어요." }
        },
        locationTipTitle: "45도 윙에서의 발 모양 & 수비 요령",
        locationTipDesc: "45도에서는 골밑 중앙으로 파고드는 것이 가장 위험해요! 중앙 쪽 발을 살짝 앞에 두고 비스듬한 스탠스를 취해 공격수를 사이드라인으로 몰아내세요.",
        voiceScript: "오른쪽 45도에서는 가장 위험한 골밑 중앙으로 들어오지 못하게 막는 것이 핵심이에요. 가운데 발을 앞에 두고 사이드 쪽으로 몰아내세요!"
      },
      {
        id: 3,
        title: "왼쪽 윙 45도 (Left Wing)",
        shortName: "좌측 45도",
        situationDesc: "빨간색 공격수가 <strong>왼쪽 45도 지역</strong>에서 골대를 조준하고 있어요!",
        attacker: { x: 145, y: 415, angle: 28, label: "공격자 (좌측 45도)" },
        axisTarget: { x: 145, y: 415 },
        otherPlayers: [],
        correctChoice: 'B',
        choices: {
          A: { x: 175, y: 355, angle: -152, label: "바짝 붙기", isCorrect: false, feedbackTitle: "앗! 쉽게 뚫려버려요!", feedbackDesc: "거리가 너무 좁아 상대의 빠른 드라이브인에 반응할 시간적 여유가 없어요." },
          B: { x: 220, y: 305, angle: -152, label: "중앙 방어 위치", isCorrect: true, feedbackTitle: "정답입니다! 훌륭해요!", feedbackDesc: "골대와 공격수를 잇는 축선 위에서 팔 하나 거리를 지켜 골밑 진입을 완벽히 차단했어요!" },
          C: { x: 110, y: 285, angle: -110, label: "엉뚱한 외곽", isCorrect: false, feedbackTitle: "방향이 어긋났어요!", feedbackDesc: "골대 방향이 아닌 엉뚱한 바깥을 보고 있어서 공격수가 편안하게 골밑으로 달릴 수 있어요." }
        },
        locationTipTitle: "왼쪽 45도에서의 발 모양 & 수비 요령",
        locationTipDesc: "왼쪽 45도에서도 중앙 쪽 발로 골밑 길목을 막아주는 스탠스를 취하세요. 시선은 공격수의 배꼽에 고정!",
        voiceScript: "왼쪽 45도에서도 골대와 공격수 사이 일직선을 지켜야 해요. 팔 하나 간격에서 한 손은 높이, 한 손은 낮게 펼쳐주세요!"
      },
      {
        id: 4,
        title: "오른쪽 코너 3점 (Right Corner)",
        shortName: "우측 코너",
        situationDesc: "빨간색 공격수가 <strong>오른쪽 코너 구석</strong>에서 공을 잡았어요! 등 뒤가 아웃라인이에요.",
        attacker: { x: 530, y: 160, angle: -80, label: "공격자 (우측 코너)" },
        axisTarget: { x: 530, y: 160 },
        otherPlayers: [],
        correctChoice: 'C',
        choices: {
          A: { x: 390, y: 120, angle: 100, label: "골밑에서 대기", isCorrect: false, feedbackTitle: "너무 멀어요! 오픈 3점슛!", feedbackDesc: "코너 3점슛은 거리가 짧아 성공률이 높아요! 이렇게 멀리 떨어지면 3점슛을 그대로 헌납해요." },
          B: { x: 485, y: 160, angle: 100, label: "코앞에 붙기", isCorrect: false, feedbackTitle: "엔드라인 돌파 허용!", feedbackDesc: "너무 바짝 붙으면 공격수가 베이스라인을 타고 쏙 빠져나가 레이업을 쏴요!" },
          C: { x: 450, y: 140, angle: 100, label: "코너 봉쇄 위치", isCorrect: true, feedbackTitle: "완벽한 코너 수비 성공!", feedbackDesc: "베이스라인 돌파를 완벽히 막고 코트 구석으로 상대를 가두었어요! 사이드라인이 제6의 수비수가 됩니다!" }
        },
        locationTipTitle: "코너에서의 발 모양 & 수비 요령",
        locationTipDesc: "코너는 뒤와 옆이 선으로 막혀있어요! 골대 밑으로 파고드는 베이스라인 쪽 발을 단단히 닫아주면 공격수를 코너에 꽁꽁 가둘 수 있어요!",
        voiceScript: "코너는 뒤와 옆이 선으로 막혀 있는 명당이에요. 골대 밑으로 파고들지 못하게 베이스라인을 막고 코너에 가두세요!"
      },
      {
        id: 5,
        title: "왼쪽 코너 3점 (Left Corner)",
        shortName: "좌측 코너",
        situationDesc: "빨간색 공격수가 <strong>왼쪽 코너 구석</strong>에서 슛 기회를 노리고 있어요!",
        attacker: { x: 70, y: 160, angle: 80, label: "공격자 (좌측 코너)" },
        axisTarget: { x: 70, y: 160 },
        otherPlayers: [],
        correctChoice: 'A',
        choices: {
          A: { x: 150, y: 140, angle: -100, label: "베이스라인 차단", isCorrect: true, feedbackTitle: "정답! 환상적인 위치 선정!", feedbackDesc: "골대 밑으로 빠져나가는 길목을 발로 딱 막고, 슛을 쏠 때 바로 손을 뻗을 수 있는 완벽한 위치예요!" },
          B: { x: 115, y: 160, angle: -100, label: "바짝 밀착", isCorrect: false, feedbackTitle: "파울 위험 & 돌파 허용!", feedbackDesc: "너무 달라붙으면 상대가 살짝 훼이크만 줘도 파울을 범하거나 쉽게 뒤를 내주게 돼요." },
          C: { x: 210, y: 120, angle: -100, label: "너무 먼 거리", isCorrect: false, feedbackTitle: "슛을 너무 쉽게 줘요!", feedbackDesc: "거리가 너무 멀어서 상대가 여유롭게 조준하고 슛을 쏠 수 있어요." }
        },
        locationTipTitle: "왼쪽 코너 수비의 발 모양 포인트",
        locationTipDesc: "골대 밑으로 향하는 베이스라인 진로에 발을 먼저 딛고 서세요. 하이핸드로 시야를 가려주면 백발백중 슛을 막을 수 있어요!",
        voiceScript: "왼쪽 코너에서도 골대 밑으로 들어오지 못하게 몸으로 길목을 막으세요. 한 손을 번쩍 들어 슛 각도를 좁혀주는 것이 비법입니다!"
      },
      {
        id: 6,
        title: "골밑 바로 앞 (로우 포스트, Low Post)",
        shortName: "골밑/페인트",
        situationDesc: "빨간색 공격수가 <strong>골대 바로 앞 골밑</strong>에서 공을 잡았어요! 골밑 슛 위기예요!",
        attacker: { x: 300, y: 165, angle: 0, label: "공격자 (골밑)" },
        axisTarget: { x: 300, y: 165 },
        otherPlayers: [],
        correctChoice: 'B',
        choices: {
          A: { x: 230, y: 140, angle: 180, label: "옆으로 비켜서기", isCorrect: false, feedbackTitle: "골대 정면이 비었어요!", feedbackDesc: "골대 정면을 비워두면 공격수가 가볍게 골밑 슛이나 레이업을 성공시켜요!" },
          B: { x: 300, y: 115, angle: 180, label: "골대 앞 수비벽", isCorrect: true, feedbackTitle: "슈퍼 수비 성공! 정답이에요!", feedbackDesc: "골대 바로 앞에서 등을 기대지 못하게 두 발로 튼튼히 버티며 두 손을 번쩍 들어 슛을 방해했어요!" },
          C: { x: 300, y: 55, angle: 180, label: "골대 뒤로 숨기", isCorrect: false, feedbackTitle: "골대 뒤는 안 돼요!", feedbackDesc: "골대 뒤로 물러서면 수비수가 없는 것과 다름없어요. 편안한 골밑슛을 내주게 됩니다." }
        },
        locationTipTitle: "골밑에서의 발 모양 & 스탠스",
        locationTipDesc: "골밑에서는 공격수와 골대 사이를 절대 비우면 안 돼요! 발을 어깨너비 1.5배로 벌려 단단히 지지하고, 두 손을 번쩍 들어 파울 없이 벽처럼 버티세요!",
        voiceScript: "골밑에서는 공격수와 골대 사이를 절대 양보하면 안 돼요! 무릎을 굽히고 두 팔을 하늘 높이 번쩍 들어 벽처럼 든든히 버티세요!"
      },
      {
        id: 7,
        title: "자유투 라인 정면 (하이 포스트, High Post)",
        shortName: "자유투 정면",
        situationDesc: "빨간색 공격수가 <strong>자유투 라인 한가운데</strong>에서 공을 잡고 슛과 패스를 노리고 있어요!",
        attacker: { x: 300, y: 270, angle: 0, label: "공격자 (자유투 라인)" },
        axisTarget: { x: 300, y: 270 },
        otherPlayers: [],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 205, angle: 180, label: "골밑 입구 방어", isCorrect: true, feedbackTitle: "완벽한 차단! 정답이에요!", feedbackDesc: "페인트존으로 들어오는 입구를 딱 지키고, 자유투 슛과 골밑 패스를 모두 방해할 수 있는 최적의 간격이에요!" },
          B: { x: 300, y: 245, angle: 180, label: "코앞 밀착", isCorrect: false, feedbackTitle: "스핀 무브에 당해요!", feedbackDesc: "자유투 라인에서 너무 붙으면 상대가 한 바퀴 휙 도는 기술(스핀 무브)이나 돌파에 쉽게 제쳐져요." },
          C: { x: 300, y: 120, angle: 180, label: "골밑까지 후퇴", isCorrect: false, feedbackTitle: "자유투 슛 허용!", feedbackDesc: "골밑까지 너무 물러서면 공격수가 편안하게 오픈 점프슛을 쏴서 점수를 줍니다." }
        },
        locationTipTitle: "하이 포스트에서의 발 모양 & 수비 요령",
        locationTipDesc: "자유투 라인은 슛과 안쪽 패스가 모두 일어나는 길목이에요. 두 발을 안정적으로 벌리고, 한 손은 슛을 막고 다른 손은 골밑 패스를 쳐내세요!",
        voiceScript: "자유투 라인은 슛과 패스가 모두 일어나는 중심지예요. 팔 하나 거리를 지키며 골밑으로 들어가는 패스를 손으로 차단하세요!"
      },
      {
        id: 8,
        title: "자유투 라인 모서리 (오른쪽 엘보우, Elbow)",
        shortName: "우측 엘보우",
        situationDesc: "빨간색 공격수가 <strong>자유투 라인 오른쪽 모서리(엘보우)</strong>에서 슛 폼을 잡고 있어요!",
        attacker: { x: 390, y: 265, angle: -35, label: "공격자 (엘보우)" },
        axisTarget: { x: 390, y: 265 },
        otherPlayers: [],
        correctChoice: 'C',
        choices: {
          A: { x: 450, y: 220, angle: 145, label: "바깥쪽으로 치우침", isCorrect: false, feedbackTitle: "골대 직행로가 뚫렸어요!", feedbackDesc: "수비수가 바깥쪽으로 치우쳐 있어서 공격수가 골대 정면으로 곧바로 드리블할 수 있어요." },
          B: { x: 365, y: 230, angle: 145, label: "너무 가까움", isCorrect: false, feedbackTitle: "파울 위험 증가!", feedbackDesc: "엘보우 지역에서 무리하게 붙으면 공격수의 슛 동작에 걸려 반칙(파울)을 부를 수 있어요." },
          C: { x: 345, y: 185, angle: 145, label: "대각선 차단선", isCorrect: true, feedbackTitle: "명품 수비! 정답이에요!", feedbackDesc: "골대 중심을 향하는 대각선 일직선 위에 발을 두고 서서 슛과 골밑 침투를 완벽히 막아냈어요!" }
        },
        locationTipTitle: "엘보우에서의 발 모양 & 수비 요령",
        locationTipDesc: "엘보우에서는 골대 쪽으로 비스듬히 파고드는 대각선 돌파가 가장 위협적이에요. 골대를 등지고 발끝이 공격수를 정확히 겨냥하도록 서세요!",
        voiceScript: "엘보우에서는 골대로 파고드는 대각선 돌파를 막는 것이 중요해요. 골대와 공격수를 잇는 일직선 상에 서서 중심을 낮추세요!"
      },
      {
        id: 9,
        title: "왼쪽 미들레인지 (Left Mid-Range)",
        shortName: "좌측 미들",
        situationDesc: "빨간색 공격수가 <strong>3점 라인 안쪽 미들 지역</strong>에서 점프슛을 노리고 있어요!",
        attacker: { x: 190, y: 290, angle: 35, label: "공격자 (미들레인지)" },
        axisTarget: { x: 190, y: 290 },
        otherPlayers: [],
        correctChoice: 'A',
        choices: {
          A: { x: 245, y: 210, angle: -145, label: "슛 & 돌파 견제", isCorrect: true, feedbackTitle: "백점 만점 수비! 정답이에요!", feedbackDesc: "골대와 일직선 상에서 팔 하나 간격을 완벽하게 유지하여 점프슛과 돌파를 모두 틀어막았어요!" },
          B: { x: 215, y: 255, angle: -145, label: "코앞 점프", isCorrect: false, feedbackTitle: "페이크에 날아올라요!", feedbackDesc: "너무 바짝 붙은 상태에서 상대 슛 페이크에 펄쩍 뛰면 그대로 옆으로 지나쳐 돌파당해요." },
          C: { x: 285, y: 150, angle: -145, label: "너무 뒤로 물러섬", isCorrect: false, feedbackTitle: "깨끗한 점퍼 허용!", feedbackDesc: "미들레인지는 슛 정확도가 아주 높아요! 이렇게 물러서면 편안한 2점슛을 그대로 내줘요." }
        },
        locationTipTitle: "미들레인지에서의 발 모양 & 스탠스",
        locationTipDesc: "미들레인지는 슛 성공률이 높아요. 발은 바닥에 단단히 붙인 채, 상대 슛 페이크에 뜨지 않고 하이핸드로 시야만 가려주세요!",
        voiceScript: "미들레인지에서는 상대 슛 속임수에 속아 펄쩍 뛰면 안 돼요! 발은 땅에 붙이고 한 손만 번쩍 뻗어 시야를 가려주세요!"
      },
      {
        id: 10,
        title: "속공 방어 / 센터라인 부근 (Fast Break)",
        shortName: "속공 수비",
        situationDesc: "빨간색 공격수가 <strong>하프라인을 넘어 빠른 스피드로 질주</strong>해 오고 있어요!",
        attacker: { x: 300, y: 640, angle: 0, label: "공격자 (속공 돌진)" },
        axisTarget: { x: 300, y: 640 },
        otherPlayers: [],
        correctChoice: 'C',
        choices: {
          A: { x: 300, y: 600, angle: 180, label: "중앙선에서 덤비기", isCorrect: false, feedbackTitle: "앗! 순식간에 제쳐졌어요!", feedbackDesc: "달려오는 공격수에게 무리하게 앞으로 덤비면 휙 스피드로 뚫려 1초 만에 실점해요!" },
          B: { x: 190, y: 520, angle: 180, label: "옆으로 피하기", isCorrect: false, feedbackTitle: "중앙 고속도로가 뻥!", feedbackDesc: "중앙 길목을 비워두면 공격수가 골대까지 일직선으로 달려와 손쉬운 레이업을 넣어요." },
          C: { x: 300, y: 510, angle: 180, label: "백코트 지연 위치", isCorrect: true, feedbackTitle: "천재적인 속공 수비! 정답이에요!", feedbackDesc: "무리하게 덤비지 않고 골대 쪽으로 물러서면서(백코트) 상대 속도를 늦추고 우리 팀이 복귀할 시간을 벌었어요!" }
        },
        locationTipTitle: "속공 수비의 발놀림(Footwork) 비법",
        locationTipDesc: "달려오는 공격수를 향해 마주보고 서서 골대 방향으로 뒷걸음질(백페달)치며 상대 스피드를 줄이세요!",
        voiceScript: "속공 상황에서는 절대로 먼저 덤비지 마세요! 골대 쪽으로 물러나며 상대 속도를 늦추어 우리 편이 돌아올 시간을 벌어주는 것이 정답입니다!"
      },
      {
        id: 11,
        title: "오른쪽 미들레인지 (Right Mid-Range)",
        shortName: "우측 미들",
        situationDesc: "빨간색 공격수가 <strong>오른쪽 미들레인지(중거리)</strong>에서 슛과 돌파를 모두 노리고 있어요!",
        attacker: { x: 410, y: 320, angle: -30, label: "공격자 (우측 미들)" },
        axisTarget: { x: 410, y: 320 },
        otherPlayers: [],
        correctChoice: 'A',
        choices: {
          A: { x: 350, y: 235, angle: 150, label: "팔 하나 거리 & 슛 견제", isCorrect: true, feedbackTitle: "완벽한 정답! 짝짝짝!", feedbackDesc: "골대와 공격수를 잇는 일직선 상에서 팔 하나 거리를 딱 지켜, 중거리 슛과 골밑 돌파를 모두 막아냈어요!" },
          B: { x: 390, y: 285, angle: 150, label: "너무 바짝 붙기", isCorrect: false, feedbackTitle: "앗! 페이크에 뚫려요!", feedbackDesc: "미들 구간에서 너무 바짝 붙으면 상대의 슛 페이크 한 번에 중심을 잃고 순식간에 돌파당해요." },
          C: { x: 290, y: 180, angle: 180, label: "골밑으로 물러서기", isCorrect: false, feedbackTitle: "편안한 점퍼 허용!", feedbackDesc: "너무 멀리 떨어지면 상대가 편안하게 뱅크슛이나 클린 점프슛을 성공시켜요." }
        },
        locationTipTitle: "미들레인지 수비의 핵심 공식",
        locationTipDesc: "미들레인지는 슛 정확도가 높은 구간이에요! 두 발을 단단히 딛고 한 손은 눈앞을 가리는 하이핸드로 견제하세요.",
        voiceScript: "오른쪽 미들레인지에서는 슛 페이크에 속지 않는 것이 중요해요. 팔 하나 거리를 유지하며 한 손으로 시야를 가려주세요!"
      },
      {
        id: 12,
        title: "자유투 라인 왼쪽 모서리 (Left Elbow)",
        shortName: "좌측 엘보우",
        situationDesc: "빨간색 공격수가 <strong>자유투 라인 왼쪽 모서리(엘보우)</strong>에서 골대를 정조준하고 있어요!",
        attacker: { x: 230, y: 270, angle: 25, label: "공격자 (좌측 엘보우)" },
        axisTarget: { x: 230, y: 270 },
        otherPlayers: [],
        correctChoice: 'B',
        choices: {
          A: { x: 240, y: 235, angle: -155, label: "과도한 밀착", isCorrect: false, feedbackTitle: "파울 주의!", feedbackDesc: "공격수에게 몸을 들이밀면 공격자가 턴을 돌며 파울을 얻어내 자유투를 내주게 돼요." },
          B: { x: 265, y: 195, angle: -155, label: "중앙 방어 스탠스", isCorrect: true, feedbackTitle: "교과서적인 위치 선정!", feedbackDesc: "가장 위험한 코트 중앙(골밑) 진입을 가로막고 상대를 외곽 쪽으로 안전하게 밀어냈어요!" },
          C: { x: 180, y: 200, angle: -120, label: "골밑 길목 비우기", isCorrect: false, feedbackTitle: "중앙 고속도로 허용!", feedbackDesc: "중앙 진로를 비워두면 공격수가 힘차게 파고들어 손쉬운 레이업을 올려놓아요." }
        },
        locationTipTitle: "엘보우(Elbow) 지역 수비 요령",
        locationTipDesc: "엘보우에서는 골밑 중앙으로 들어오는 드라이브인을 막기 위해 안쪽 발을 살짝 앞에 두고 상대를 외곽으로 유도하세요.",
        voiceScript: "왼쪽 엘보우에서는 공격수가 중앙으로 파고들지 못하게 안쪽 발을 앞에 두고 외곽으로 유도해야 합니다!"
      },
      {
        id: 13,
        title: "오른쪽 숏코너 베이스라인 저지 (Baseline Contain)",
        shortName: "숏코너 방어",
        situationDesc: "공격수가 <strong>골대 오른쪽 숏코너</strong>에서 엔드라인(베이스라인)을 타고 골밑으로 파고들려 해요!",
        attacker: { x: 470, y: 180, angle: -70, label: "공격자 (숏코너)" },
        axisTarget: { x: 470, y: 180 },
        otherPlayers: [],
        correctChoice: 'C',
        choices: {
          A: { x: 430, y: 240, angle: 180, label: "베이스라인 뻥 뚫어주기", isCorrect: false, feedbackTitle: "역방향 득점 헌납!", feedbackDesc: "베이스라인을 열어주면 공격수가 리버스 레이업을 손쉽게 올려놓아요." },
          B: { x: 460, y: 160, angle: 110, label: "선 밖으로 밀치기", isCorrect: false, feedbackTitle: "푸싱 파울!", feedbackDesc: "라인 밖으로 밀어내려다 불필요한 푸싱 파울을 범하게 돼요." },
          C: { x: 405, y: 135, angle: 110, label: "베이스라인 빗장 수비", isCorrect: true, feedbackTitle: "철벽 베이스라인 빗장!", feedbackDesc: "베이스라인 쪽 발을 먼저 깊게 디뎌 림으로 파고드는 가장 빠른 지름길을 완벽히 차단했어요!" }
        },
        locationTipTitle: "베이스라인 수비는 선(Line)을 아군으로!",
        locationTipDesc: "베이스라인 쪽 길을 막아서면 공격수는 라인 밖으로 나가거나 어려운 슛을 쏠 수밖에 없어요. 엔드라인을 제6의 수비수로 삼으세요!",
        voiceScript: "골대 밑 숏코너에서는 베이스라인 쪽 진로를 먼저 틀어막아 공격수가 라인 밖으로 나가도록 유도해야 합니다!"
      },
      {
        id: 14,
        title: "딥쓰리(Deep Three) 장거리 슛 방어",
        shortName: "딥쓰리 견제",
        situationDesc: "사거리가 엄청나게 긴 공격수가 <strong>3점 라인 1m 뒤(딥쓰리 존)</strong>에서 기습 슛을 쏘려 해요!",
        attacker: { x: 300, y: 550, angle: 0, label: "공격자 (딥쓰리 슈터)" },
        axisTarget: { x: 300, y: 550 },
        otherPlayers: [],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 460, angle: 180, label: "하이핸드 슛 견제 거리", isCorrect: true, feedbackTitle: "환상적인 롱슛 수비!", feedbackDesc: "3점 라인 부근에서 한 손을 번쩍 들어 슛 궤적을 가리면서도, 상대 돌파에 대처할 수 있는 이상적인 거리를 지켰어요!" },
          B: { x: 300, y: 535, angle: 180, label: "하프라인까지 덤벼들기", isCorrect: false, feedbackTitle: "돌파 고속도로 개통!", feedbackDesc: "너무 멀리까지 성급하게 덤벼들면 상대가 휙 드리블로 제쳐 5대4 수적 우위를 내주게 돼요." },
          C: { x: 300, y: 320, angle: 180, label: "골밑에서 관전하기", isCorrect: false, feedbackTitle: "오픈 딥쓰리 폭격!", feedbackDesc: "거리가 너무 멀어 슈터가 아무 방해도 받지 않고 여유롭게 장거리 3점을 꽂아넣어요." }
        },
        locationTipTitle: "장거리 슈터를 만났을 때의 대처법",
        locationTipDesc: "딥쓰리 슈터를 막을 때는 3점 라인 위에 위치해 한 손을 높이 들어(하이핸드) 슛 시야를 가려주고, 돌파 시 잔발로 따라가세요.",
        voiceScript: "장거리 딥쓰리 슈터를 막을 때는 너무 앞으로 덤비지 말고, 3점 라인 위에서 하이핸드로 시야를 가려주세요!"
      },
      {
        id: 15,
        title: "페인트존 림 프로텍션 (Rim Protection)",
        shortName: "림 프로텍션",
        situationDesc: "상대 공격수가 <strong>골밑 바로 앞 페인트존</strong>까지 파고들었어요! 마지막 실점을 막아낼 최후의 수비 위치는?",
        attacker: { x: 300, y: 150, angle: 0, label: "공격자 (골밑 슛 시도)" },
        axisTarget: { x: 300, y: 150 },
        otherPlayers: [],
        correctChoice: 'B',
        choices: {
          A: { x: 300, y: 75, angle: 180, label: "골대 밑 노차징존 안", isCorrect: false, feedbackTitle: "차징 유도 불가 & 득점 허용!", feedbackDesc: "골대 바로 밑 노차징 반원 안에서는 수비수가 서 있어도 공격자 파울이 선언되지 않아요!" },
          B: { x: 300, y: 105, angle: 180, label: "노차징존 밖 수직 만세 자세", isCorrect: true, feedbackTitle: "철벽 림 프로텍터! 정답!", feedbackDesc: "노차징 구역 밖에서 두 발을 바닥에 단단히 붙이고 양손을 수직으로 뻗어 실점을 완벽히 저지했어요!" },
          C: { x: 300, y: 140, angle: 180, label: "공격수에게 앞으로 점프하기", isCorrect: false, feedbackTitle: "바스켓카운트 앤드원(And-1) 실점!", feedbackDesc: "앞으로 점프하며 공격수와 부딪히면 수비자 파울이 불려 추가 자유투까지 헌납해요." }
        },
        locationTipTitle: "골밑 수직성의 원칙 (Rule of Vertically)",
        locationTipDesc: "골밑에서는 앞으로 뛰지 말고 제자리에서 양손을 하늘로 곧게 뻗어야 파울 없이 깨끗하게 슛을 막을 수 있어요!",
        voiceScript: "골밑에서는 절대 앞으로 뛰지 마세요! 노차징존 밖에서 두 발을 붙이고 양손을 하늘로 수직으로 뻗어야 완벽한 수비입니다!"
      },
      {
        id: 16,
        title: "펌프 페이크(Pump Fake) 슛 속임수 대처",
        shortName: "슛 페이크 대처",
        situationDesc: "공격수가 3점 라인에서 <strong>공을 번쩍 치켜들며 슛 페이크</strong>를 썼어요! 낚이지 않을 올바른 자세는?",
        attacker: { x: 300, y: 470, angle: 0, label: "슛 페이크 공격수" },
        axisTarget: { x: 300, y: 470 },
        otherPlayers: [],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 370, angle: 180, label: "발을 땅에 붙이고 하이핸드만 견제", isCorrect: true, feedbackTitle: "완벽한 침착함! 정답!", feedbackDesc: "펄쩍 뛰지 않고 두 발을 땅에 붙인 채 한 손만 뻗어 시야를 가려 슛 속임수를 완전히 무력화했어요!" },
          B: { x: 300, y: 420, angle: 180, label: "블록슛 하려고 공중으로 펄쩍 뛰기", isCorrect: false, feedbackTitle: "페이크에 낚여 돌파 허용!", feedbackDesc: "공중에 뜨는 순간 상대가 유유히 옆으로 파고들어 손쉬운 레이업을 넣어요." },
          C: { x: 300, y: 240, angle: 180, label: "깜짝 놀라 골밑으로 도망치기", isCorrect: false, feedbackTitle: "진짜 3점슛 실점!", feedbackDesc: "도망치면 공격수가 속임수를 거두고 진짜 오픈 3점슛을 편안하게 쏴버려요." }
        },
        locationTipTitle: "절대 점프하지 마라! (Stay on your feet)",
        locationTipDesc: "슈터가 완전히 공중으로 떠오르기 전까지는 두 발을 땅에 붙이고(Stay on feet), 한 손만 뻗어 시야를 방해하세요!",
        voiceScript: "상대의 슛 속임수에는 절대 뛰지 마세요! 발을 땅에 붙이고 손만 뻗어 시야를 가리는 것이 정답입니다!"
      },
      {
        id: 17,
        title: "크로스오버(Crossover) 방향 전환 예측 수비",
        shortName: "크로스오버 방어",
        situationDesc: "공격수가 오른쪽으로 치고 나가는 척하다가 <strong>왼쪽으로 급격히 드리블 크로스오버</strong>를 시도해요! 당신의 위치는?",
        attacker: { x: 300, y: 450, angle: 0, label: "크로스오버 시도" },
        axisTarget: { x: 300, y: 450 },
        otherPlayers: [],
        correctChoice: 'B',
        choices: {
          A: { x: 370, y: 380, angle: 140, label: "가짜 오른쪽 페이크에 속아 쏠리기", isCorrect: false, feedbackTitle: "앵클 브레이커 허용!", feedbackDesc: "상대 상체 흔들기에 속아 오른쪽으로 쏠리면 반대쪽으로 완벽하게 제쳐져요." },
          B: { x: 260, y: 350, angle: -150, label: "배꼽 주시하며 왼쪽 진로 선제 차단", isCorrect: true, feedbackTitle: "귀신같은 예측 수비!", feedbackDesc: "손이나 공의 현란한 움직임에 속지 않고 상대 배꼽(중심)을 보며 꺾어 들어오는 왼쪽 길목을 미리 막았어요!" },
          C: { x: 300, y: 430, angle: 180, label: "스틸하려고 무리하게 손 뻗기", isCorrect: false, feedbackTitle: "리칭 파울 휘슬!", feedbackDesc: "빠른 크로스오버에 손을 무리하게 집어넣으면 심판의 파울 휘슬이 불려요." }
        },
        locationTipTitle: "크로스오버를 읽는 비법: 배꼽 주시",
        locationTipDesc: "공과 어깨는 속일 수 있지만 골반과 배꼽은 속일 수 없어요! 상대 배꼽의 이동 방향을 보고 사이드스텝으로 길을 막으세요.",
        voiceScript: "화려한 드리블 속임수에 속지 않으려면 공격수의 배꼽을 보며 가려는 방향의 길목을 먼저 차단해야 합니다!"
      },
      {
        id: 18,
        title: "포스트업(Post-Up) 몸싸움 버티기",
        shortName: "포스트업 수비",
        situationDesc: "덩치 큰 공격수가 <strong>골밑 근처에서 등(Back)을 지고</strong> 쿵쿵 밀고 들어오려 해요! 당신의 수비 위치와 자세는?",
        attacker: { x: 240, y: 200, angle: 100, label: "포스트업 공격수" },
        axisTarget: { x: 240, y: 200 },
        otherPlayers: [],
        correctChoice: 'C',
        choices: {
          A: { x: 200, y: 200, angle: -90, label: "뒤에서 두 손으로 힘껏 밀치기", isCorrect: false, feedbackTitle: "푸싱 파울!", feedbackDesc: "두 손으로 상대를 밀어내면 즉시 수비자 푸싱 파울이 선언돼요." },
          B: { x: 280, y: 150, angle: 160, label: "몸싸움 피해서 슬쩍 비켜주기", isCorrect: false, feedbackTitle: "골밑 턴어라운드 슛 실점!", feedbackDesc: "길을 비켜주면 상대가 편안하게 골밑으로 회전해 뱅크슛을 올려놓아요." },
          C: { x: 260, y: 160, angle: 140, label: "낮은 기마자세로 골대 쪽 진로 버티기", isCorrect: true, feedbackTitle: "철벽 바디 체크! 완벽 방어!", feedbackDesc: "무릎을 깊게 굽히고 무게중심을 낮춰 골대로 통하는 길목을 단단히 버텨내어 공격을 저지했어요!" }
        },
        locationTipTitle: "포스트업 수비의 베이스(Base) 구축",
        locationTipDesc: "상대 등을 손으로 밀지 말고, 두 발을 넓게 벌려 기마자세로 하체를 단단히 고정하고 가슴으로 합법적인 몸싸움을 펼치세요!",
        voiceScript: "등을 지고 들어오는 포스트업 공격수는 무릎을 낮추고 하체를 단단히 버텨 골대 쪽 진로를 막아야 합니다!"
      },
      {
        id: 19,
        title: "스텝백 3점슛(Step-Back 3PT) 착지 공간 안전 견제",
        shortName: "스텝백 견제",
        situationDesc: "공격수가 순간적으로 <strong>뒤로 껑충 뛰며 스텝백 3점슛</strong>을 시도해요! 파울 없이 슛을 견제할 위치는?",
        attacker: { x: 440, y: 440, angle: -30, label: "스텝백 3점 시도" },
        axisTarget: { x: 440, y: 440 },
        otherPlayers: [],
        correctChoice: 'A',
        choices: {
          A: { x: 380, y: 350, angle: 150, label: "착지 공간을 남겨두고 손만 뻗어 견제", isCorrect: true, feedbackTitle: "교양 있고 완벽한 수비! 정답!", feedbackDesc: "슈터의 착지 발 공간을 침범하지 않고 안전거리를 지키며 높은 손으로 슛 시야만 완벽히 가렸어요!" },
          B: { x: 430, y: 430, angle: 150, label: "슛 쏘는 발밑으로 몸을 밀어넣기", isCorrect: false, feedbackTitle: "위험한 착지 파울(자유투 3개)!", feedbackDesc: "슈터의 발밑에 발을 넣으면 큰 부상을 유발하며 플래그런트 파울과 자유투 3개를 헌납해요!" },
          C: { x: 320, y: 260, angle: 180, label: "골밑으로 뒷걸음질 치기", isCorrect: false, feedbackTitle: "노마크 3점슛 헌납!", feedbackDesc: "너무 물러서면 상대가 아무 방해 없이 시원하게 스텝백 3점을 꽂아넣어요." }
        },
        locationTipTitle: "착지 공간(Landing Zone) 보장의 룰",
        locationTipDesc: "스텝백 슈터를 막을 때는 앞으로 무리하게 덮치지 말고, 슈터 발밑 30cm 앞까지만 가서 팔을 높게 뻗어야 파울을 범하지 않습니다!",
        voiceScript: "스텝백 슛을 막을 때는 상대 발밑으로 들어가지 말고, 안전거리를 둔 채 높은 손으로 시야만 방해하세요!"
      },
      {
        id: 20,
        title: "1대1 엔드게임 버저비터(Buzzer Beater) 결사 방어",
        shortName: "버저비터 방어",
        situationDesc: "우리가 1점 앞선 <strong>경기 종료 2초 전!</strong> 상대 에이스가 마지막 승부 슛을 던지려 해요! 대망의 최종 수비 위치는?",
        attacker: { x: 300, y: 430, angle: 0, label: "마지막 슛 시도 에이스" },
        axisTarget: { x: 300, y: 430 },
        otherPlayers: [],
        correctChoice: 'B',
        choices: {
          A: { x: 300, y: 420, angle: 180, label: "공을 뺏으려고 무리하게 후려치기", isCorrect: false, feedbackTitle: "종료 0.1초 전 파울 & 역전패!", feedbackDesc: "무리하게 손을 휘두르면 파울이 불려 자유투로 역전패당하는 최악의 결과가 나와요!" },
          B: { x: 300, y: 330, angle: 180, label: "골대-공격수 일직선 만세 수직 자세", isCorrect: true, feedbackTitle: "경기 종료 버저! 챔피언 등극!", feedbackDesc: "파울을 범하지 않고 완벽한 수직 만세 자세로 마지막 슛을 가로막아 감격의 우승을 차지했어요!" },
          C: { x: 300, y: 150, angle: 180, label: "골대 밑으로 숨어버리기", isCorrect: false, feedbackTitle: "버저비터 미들 점퍼 실점!", feedbackDesc: "거리가 멀어 상대 에이스가 가볍게 결승 버저비터를 터뜨려요." }
        },
        locationTipTitle: "마지막 1초의 철칙: 파울 절대 금지!",
        locationTipDesc: "리드하고 있는 마지막 순간에는 절대 스틸을 노리지 마세요! 골대 앞을 몸으로 가로막고 수직으로 만세를 하고 버텨 승리를 지키세요!",
        voiceScript: "경기 종료 직전에는 절대 손을 휘둘러 파울을 범하지 말고, 두 손을 하늘로 뻗어 마지막 슛을 안전하게 막아내세요!"
      }
    ],

    // ---------------- 2대2 팀워크 모드 (20문제) ----------------
    '2v2': [
      {
        id: 1,
        title: "2대2 패스 차단 (디나이 수비, Deny)",
        shortName: "디나이 수비",
        situationDesc: "정면(#7)이 우측 45도 공격수(#9)에게 패스하려 해요! 동료(#3)가 공을 막고 있어요. <strong>당신은 45도 공격수(#9)를 막는 수비수</strong>입니다!",
        attacker: { x: 300, y: 470, angle: 0, label: "공 가진 #7 (빨강)" },
        axisTarget: { x: 440, y: 410 },
        otherPlayers: [
          { type: 'att', x: 440, y: 410, angle: -30, number: '9', name: '공격수 9' },
          { type: 'def', x: 300, y: 380, angle: 180, number: '3', name: '동료 수비 3' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 480, y: 390, angle: 150, label: "공격수 뒤에 서기", isCorrect: false, feedbackTitle: "패스를 그냥 줘요!", feedbackDesc: "상대 등 뒤에 서 있으면 공격수가 편하게 패스를 받아 슛을 쏴요!" },
          B: { x: 400, y: 390, angle: 135, label: "패스 길목 차단 (디나이)", isCorrect: true, feedbackTitle: "완벽한 디나이 수비 성공!", feedbackDesc: "공과 내 마크맨 사이 길목에 서서 한 팔을 뻗어 패스를 사전 차단했어요!" },
          C: { x: 320, y: 300, angle: 180, label: "골밑으로 도망가기", isCorrect: false, feedbackTitle: "외곽이 텅 비었어요!", feedbackDesc: "마크맨을 완전히 놓쳐 오픈 3점슛을 맞게 돼요." }
        },
        locationTipTitle: "2대2 디나이(Deny) 수비 비법",
        locationTipDesc: "공이 없는 공격수를 막을 때는 '공'과 '내 마크맨'을 모두 시야에 두는 수비 삼각형을 만들고, 패스 길목에 손을 뻗어 쉽게 공을 받지 못하게 방해해야 해요!",
        voiceScript: "2대2 디나이 수비에서는 공과 내 마크맨을 모두 보면서 패스 길목에 손을 뻗어 공을 가로채거나 차단해야 합니다!"
      },
      {
        id: 2,
        title: "2대2 동료 돌파 허용 시 도움 수비 (Help)",
        shortName: "도움 수비(헬프)",
        situationDesc: "왼쪽 윙에서 동료(#3)가 돌파당했어요! 빨간색 공격수가 골밑으로 돌진 중입니다! <strong>골밑 근처에 있는 당신의 수비 위치는?</strong>",
        attacker: { x: 190, y: 320, angle: 30, label: "돌파 돌진 (#7 빨강)" },
        axisTarget: { x: 190, y: 320 },
        otherPlayers: [
          { type: 'att', x: 440, y: 380, angle: -30, number: '9', name: '외곽 공격수' },
          { type: 'def', x: 160, y: 360, angle: 30, number: '3', name: '제쳐진 동료' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 280, y: 180, angle: 140, label: "골밑 길목 도움 수비(Help)", isCorrect: true, feedbackTitle: "골밑을 구한 특급 헬프 수비!", feedbackDesc: "돌파해 들어오는 공격수의 앞길을 가로막아 쉬운 골밑 레이업을 막아냈어요!" },
          B: { x: 410, y: 340, angle: 150, label: "내 마크맨에게만 붙기", isCorrect: false, feedbackTitle: "골밑 레이업 실점!", feedbackDesc: "동료가 뚫렸을 때는 가장 위험한 골밑을 먼저 도와줘야 해요!" },
          C: { x: 300, y: 50, angle: 180, label: "골대 뒤로 물러서기", isCorrect: false, feedbackTitle: "공간을 너무 비워줬어요!", feedbackDesc: "골대 밑까지 너무 물러서면 쉬운 플로터나 뱅크슛을 허용해요." }
        },
        locationTipTitle: "헬프 디펜스(도움 수비)의 핵심",
        locationTipDesc: "팀 농구에서는 동료가 뚫렸을 때 1순위로 '우리 골밑'을 지켜야 해요! 내 마크맨을 1초간 살짝 비우더라도 먼저 골밑 레이업 길목을 가로막으세요!",
        voiceScript: "동료가 돌파당했을 때는 내 마크맨만 보지 말고, 즉시 골밑으로 발을 이동해 상대 레이업을 막아주는 도움 수비가 최고의 팀워크입니다!"
      },
      {
        id: 3,
        title: "2대2 스크린(Pick & Roll) 대처",
        shortName: "스크린 대처",
        situationDesc: "공격수 9번이 우리 동료(#3) 옆에 딱 붙어 길을 막는 스크린을 걸었어요! <strong>스크리너의 수비수인 당신은?</strong>",
        attacker: { x: 300, y: 460, angle: 0, label: "드리블러 (#7 빨강)" },
        axisTarget: { x: 300, y: 460 },
        otherPlayers: [
          { type: 'att', x: 340, y: 430, angle: 90, number: '9', name: '스크린 공격수' },
          { type: 'def', x: 300, y: 410, angle: 180, number: '3', name: '동료 수비' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 420, y: 390, angle: 180, label: "멀리 떨어져 구경하기", isCorrect: false, feedbackTitle: "골밑으로 바로 패스가 가요!", feedbackDesc: "스크리너가 골밑으로 돌진할 때 아무도 못 막게 돼요." },
          B: { x: 350, y: 480, angle: 0, label: "무리하게 스틸하러 뛰기", isCorrect: false, feedbackTitle: "파울 위험 & 뒷공간 오픈!", feedbackDesc: "무리하게 덤비면 2대1 아웃넘버 상황을 주게 됩니다." },
          C: { x: 350, y: 370, angle: 160, label: "길목 지연 & 동료 커버(드롭)", isCorrect: true, feedbackTitle: "스마트한 스크린 방어 성공!", feedbackDesc: "드리블러가 골밑으로 치고 들어오지 못하게 잠시 지연(헷지)하고 내 선수도 놓치지 않는 명당이에요!" }
        },
        locationTipTitle: "스크린 상황에서의 수비 콜(Call)",
        locationTipDesc: "스크린이 올 때는 큰 소리로 '오른쪽 스크린!'이라고 동료에게 알려주고, 무리하게 덤비지 않고 골밑 진입을 늦추어 동료가 복귀할 시간을 벌어주세요!",
        voiceScript: "스크린이 올 때는 큰 소리로 동료에게 알려주고, 골밑으로 침투하는 길목을 한 발 뒤에서 침착하게 막아내세요!"
      },
      {
        id: 4,
        title: "2대2 기브 앤 고(Give & Go) 컷인 차단",
        shortName: "컷인 차단",
        situationDesc: "공격수 7번이 9번에게 패스하자마자 골밑으로 쌩 달려 들어오고 있어요! <strong>7번 수비수인 당신의 위치는?</strong>",
        attacker: { x: 440, y: 380, angle: -30, label: "공 받은 #9 (빨강)" },
        axisTarget: { x: 300, y: 340 },
        otherPlayers: [
          { type: 'att', x: 300, y: 360, angle: 0, number: '7', name: '골밑 컷인 질주' },
          { type: 'def', x: 400, y: 340, angle: 150, number: '3', name: '동료 수비' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 280, angle: 180, label: "골밑 앞길 가로막기 (차단)", isCorrect: true, feedbackTitle: "나이스 컷인 차단!", feedbackDesc: "달려 들어오는 선수의 골밑 진로를 가슴으로 당당히 막아 완벽하게 패스를 차단했어요!" },
          B: { x: 230, y: 360, angle: 180, label: "옆으로 비켜주기", isCorrect: false, feedbackTitle: "원패스 골밑 레이업 허용!", feedbackDesc: "길을 비켜주면 공격수가 가볍게 골밑 슛을 넣어요." },
          C: { x: 420, y: 350, angle: 180, label: "공 쪽으로 우르르 몰려가기", isCorrect: false, feedbackTitle: "내 마크맨 컷인 방치!", feedbackDesc: "공만 쫓아가면 뒤에서 골밑으로 뛰어드는 선수를 완전히 놓쳐요." }
        },
        locationTipTitle: "기브 앤 고 수비 요령",
        locationTipDesc: "패스를 준 선수는 반드시 골밑으로 뛰어들어옵니다! 패스가 나가는 순간 내 마크맨의 앞을 몸으로 가로막아(범핑) 골밑으로 못 뛰게 만드세요!",
        voiceScript: "패스하고 골밑으로 뛰어드는 기브 앤 고는 공격수의 앞길을 몸으로 당당히 가로막아 차단해야 합니다!"
      },
      {
        id: 5,
        title: "2대2 패스 후 빠른 클로즈아웃(Closeout)",
        shortName: "클로즈아웃",
        situationDesc: "탑에서 오른쪽 윙 45도로 빠른 패스가 날아갔어요! <strong>윙 공격수(#9)를 막으러 달려가는 당신의 멈춤 위치는?</strong>",
        attacker: { x: 450, y: 400, angle: -30, label: "공 받은 #9 (빨강)" },
        axisTarget: { x: 450, y: 400 },
        otherPlayers: [
          { type: 'att', x: 300, y: 470, angle: 0, number: '7', name: '패스 준 7번' },
          { type: 'def', x: 300, y: 400, angle: 180, number: '3', name: '동료 수비' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 440, y: 410, angle: 150, label: "전속력으로 몸통 박치기", isCorrect: false, feedbackTitle: "파울 & 날아서 제쳐짐!", feedbackDesc: "너무 급하게 달려들면 슛 페이크 한 번에 휙 날아가 돌파당해요!" },
          B: { x: 380, y: 320, angle: 150, label: "팔 하나 거리에서 잔발 멈춤", isCorrect: true, feedbackTitle: "교과서적인 클로즈아웃!", feedbackDesc: "빠르게 다가가되 마지막에 잔발로 멈추며 한 손을 번쩍 들어 슛과 돌파를 모두 막았어요!" },
          C: { x: 330, y: 250, angle: 180, label: "골밑에서 멀뚱히 서기", isCorrect: false, feedbackTitle: "오픈 3점슛 헌납!", feedbackDesc: "거리가 너무 멀어 상대가 여유롭게 3점슛을 성공시켜요." }
        },
        locationTipTitle: "클로즈아웃(Closeout) 잔발 스텝",
        locationTipDesc: "외곽으로 패스가 갈 때는 전속력으로 달려가다가, 공격수 2미터 앞에서 '차차차' 잔발을 구르며 무게중심을 낮추고 한 손을 번쩍 들어야 해요!",
        voiceScript: "패스가 갈 때는 전속력으로 달려가다 마지막에 잔발로 멈추며 한 손을 번쩍 드는 클로즈아웃이 필수입니다!"
      },
      {
        id: 6,
        title: "2대2 픽앤팝(Pick & Pop) 외곽 슛 견제",
        shortName: "픽앤팝 대처",
        situationDesc: "스크린을 걸었던 공격수(#9)가 골밑 대신 <strong>3점 라인 밖(탑)으로 빠져나와 슛</strong>을 쏘려 해요! 스크리너 수비수인 당신의 위치는?",
        attacker: { x: 300, y: 480, angle: 0, label: "팝아웃 슈터 #9 (빨강)" },
        axisTarget: { x: 300, y: 480 },
        otherPlayers: [
          { type: 'att', x: 220, y: 410, angle: 30, number: '7', name: '패스 준 7번' },
          { type: 'def', x: 230, y: 350, angle: -150, number: '3', name: '동료 수비' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 395, angle: 180, label: "외곽으로 달려나가 하이핸드 슛 견제", isCorrect: true, feedbackTitle: "정확한 픽앤팝 수비!", feedbackDesc: "골밑으로 들어가지 않고 외곽으로 빠진 슈터를 빠르게 쫓아가 하이핸드로 오픈 3점을 차단했어요!" },
          B: { x: 300, y: 220, angle: 180, label: "골밑에서 멀뚱히 기다리기", isCorrect: false, feedbackTitle: "노마크 3점포 허용!", feedbackDesc: "스크리너가 외곽으로 빠졌는데 골밑에 머물러 있으면 상대에게 편안한 오픈 3점을 내줘요." },
          C: { x: 250, y: 380, angle: -140, label: "이미 공을 뺏긴 7번에게 달라붙기", isCorrect: false, feedbackTitle: "수비 중복 & 슈터 방치!", feedbackDesc: "공을 넘긴 선수에게 두 명이 겹치면 외곽 슈터가 완전히 비어버려요." }
        },
        locationTipTitle: "픽앤팝(Pick & Pop) 수비 요령",
        locationTipDesc: "스크리너가 골밑으로 뛰지 않고 외곽으로 빠지면 즉시 스크리너 수비수가 따라붙어(Recover) 슛을 방해해야 합니다!",
        voiceScript: "스크리너가 외곽으로 빠져나오는 픽앤팝 상황에서는 신속하게 외곽으로 튀어나가 손을 들어 슛을 방해하세요!"
      },
      {
        id: 7,
        title: "2대2 백도어 컷(Backdoor Cut) 차단",
        shortName: "백도어 차단",
        situationDesc: "외곽에서 디나이를 강하게 하자, 공격수(#9)가 <strong>수비수 등 뒤(골밑)로 기습 침투</strong>하고 있어요! 이를 막을 발자국은?",
        attacker: { x: 300, y: 470, angle: 0, label: "공 가진 #7 (탑)" },
        axisTarget: { x: 390, y: 310 },
        otherPlayers: [
          { type: 'att', x: 390, y: 310, angle: -50, number: '9', name: '백도어 컷인 중' },
          { type: 'def', x: 300, y: 400, angle: 180, number: '3', name: '볼 수비수' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 440, y: 380, angle: -40, label: "외곽 3점 라인에 멍하니 서있기", isCorrect: false, feedbackTitle: "등 뒤가 완전히 털렸어요!", feedbackDesc: "외곽에 서 있으면 공격수가 골밑으로 프리패스를 받아 노마크 레이업을 올려요." },
          B: { x: 330, y: 420, angle: 170, label: "탑의 볼만 쳐다보고 다가가기", isCorrect: false, feedbackTitle: "원패스 실점!", feedbackDesc: "공만 쳐다보다가 내 마크맨이 골밑으로 완벽히 통과했어요." },
          C: { x: 350, y: 240, angle: 150, label: "골대 쪽으로 몸을 돌려 길목 가로막기", isCorrect: true, feedbackTitle: "환상적인 백도어 차단!", feedbackDesc: "등 뒤로 파고드는 공격수의 진로를 골밑 앞에서 몸으로 선제 차단해 실점을 막아냈어요!" }
        },
        locationTipTitle: "백도어 컷(Backdoor) 대처법",
        locationTipDesc: "상대가 내 등 뒤로 뛸 때는 즉시 골대 방향으로 머리와 몸을 돌려(헤드 스냅) 골밑 길목을 몸으로 먼저 틀어막으세요!",
        voiceScript: "상대가 등 뒤 골밑으로 파고들 때는 즉시 골대 쪽으로 몸을 틀어 골밑 길목을 먼저 막아야 합니다!"
      },
      {
        id: 8,
        title: "2대2 사이드라인 트랩(Trap/Double Team)",
        shortName: "사이드 트랩",
        situationDesc: "공 가진 상대 가드(#7)가 <strong>우측 사이드라인 구석</strong>에 갇혔어요! 동료와 함께 퇴로를 완벽히 가둘 당신의 협력 수비 위치는?",
        attacker: { x: 490, y: 380, angle: -60, label: "코너에 몰린 #7 (빨강)" },
        axisTarget: { x: 490, y: 380 },
        otherPlayers: [
          { type: 'att', x: 300, y: 460, angle: 0, number: '9', name: '패스 대기 9번' },
          { type: 'def', x: 470, y: 320, angle: 120, number: '3', name: '골밑 차단 동료' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 300, y: 380, angle: 180, label: "중앙에서 관전하기", isCorrect: false, feedbackTitle: "트랩 실패!", feedbackDesc: "가둘 수 있는 절호의 찬스에서 중앙에 머물면 공격수가 탈출 패스를 뿌려요." },
          B: { x: 435, y: 410, angle: -150, label: "중앙 탈출로를 봉쇄하는 더블팀 위치", isCorrect: true, feedbackTitle: "완벽한 질식 트랩 디펜스!", feedbackDesc: "사이드라인과 베이스라인을 등진 상대를 두 명이 V자로 가두어 패스 미스를 완벽히 유도했어요!" },
          C: { x: 520, y: 380, angle: 90, label: "사이드라인 밖에서 밀기", isCorrect: false, feedbackTitle: "파울 휘슬!", feedbackDesc: "무리하게 몸으로 밀면 심판의 파울 휘슬이 불려요." }
        },
        locationTipTitle: "트랩(Trap) 수비의 V자 벽 형성",
        locationTipDesc: "사이드라인이나 코너에 공격수가 갇혔을 때는 손을 번쩍 들고 두 수비수가 V자 모양으로 발을 모아 탈출로를 완전히 없애세요!",
        voiceScript: "사이드라인 구석에 갇힌 상대에게는 동료와 V자로 각을 좁히며 두 팔을 벌려 탈출로를 봉쇄하세요!"
      },
      {
        id: 9,
        title: "2대2 드라이브 & 킥(Drive & Kick) 외곽 패스 차단",
        shortName: "드라이브&킥 차단",
        situationDesc: "상대(#7)가 골밑으로 돌파하면서 코너에 오픈된 슈터(#9)에게 <strong>외곽 킥아웃 패스</strong>를 뿌리려 해요! 당신의 위치는?",
        attacker: { x: 340, y: 220, angle: -20, label: "돌파한 #7 (골밑)" },
        axisTarget: { x: 480, y: 160 },
        otherPlayers: [
          { type: 'att', x: 490, y: 170, angle: -80, number: '9', name: '코너 오픈 슈터' },
          { type: 'def', x: 310, y: 150, angle: 170, number: '3', name: '골밑 블록 동료' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 430, y: 195, angle: 110, label: "패스 길목 차단 & 코너 슛 견제", isCorrect: true, feedbackTitle: "천재적인 패스 차단 & 스틸!", feedbackDesc: "골밑 돌파자의 시야를 가리며 코너로 나가는 킥아웃 패스 길목을 완벽히 차단했어요!" },
          B: { x: 330, y: 180, angle: 180, label: "골밑 동료 옆에 딱 달라붙기", isCorrect: false, feedbackTitle: "코너 3점슛 폭격!", feedbackDesc: "동료와 수비가 겹치면 코너의 슈터가 노마크 3점을 손쉽게 꽂아넣어요." },
          C: { x: 500, y: 250, angle: 90, label: "사이드라인 밖으로 이탈", isCorrect: false, feedbackTitle: "수비 구멍 발생!", feedbackDesc: "엉뚱한 위치로 빠지면 패스와 슛을 모두 허용해요." }
        },
        locationTipTitle: "드라이브 & 킥 패스 수비법",
        locationTipDesc: "골밑 도움 수비가 들어갔다면, 외곽 수비수는 패스 길목(패싱 레인) 중간에 서서 한 손으로 패스를 차단할 준비를 해야 합니다!",
        voiceScript: "돌파 후 외곽으로 빼주는 패스를 막으려면 패스 길목 중간에 서서 코너 슈터까지 함께 견제해야 합니다!"
      },
      {
        id: 10,
        title: "2대2 슬립 스크린(Slip Screen) 기습 차단",
        shortName: "슬립 스크린 방어",
        situationDesc: "스크린을 거는 척하다가 수비수가 방심한 틈을 타 <strong>골밑으로 쏜살같이 컷인하는 슬립 공격수(#9)</strong>를 막는 위치는?",
        attacker: { x: 240, y: 430, angle: 30, label: "패스 노리는 #7 (볼)" },
        axisTarget: { x: 300, y: 260 },
        otherPlayers: [
          { type: 'att', x: 310, y: 280, angle: 0, number: '9', name: '슬립 컷인 중' },
          { type: 'def', x: 230, y: 360, angle: -150, number: '3', name: '볼 수비 동료' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 260, y: 440, angle: 40, label: "가짜 스크린 자리에 서있기", isCorrect: false, feedbackTitle: "골밑 허허벌판 실점!", feedbackDesc: "가짜 스크린 위치에 멈춰 서 있으면 이미 골밑으로 빠진 공격수에게 앨리웁이나 레이업을 내줘요." },
          B: { x: 310, y: 220, angle: 180, label: "골대 앞 페인트존 길목을 선점해 차단", isCorrect: true, feedbackTitle: "완벽한 슬립 간파!", feedbackDesc: "가짜 스크린에 속지 않고 골밑으로 직행하는 공격수 앞을 먼저 가로막아 안전하게 막아냈어요!" },
          C: { x: 420, y: 350, angle: 180, label: "반대편 외곽으로 도망가기", isCorrect: false, feedbackTitle: "골밑 실점 헌납!", feedbackDesc: "골밑 앞자리를 비워두면 쉬운 득점을 허용해요." }
        },
        locationTipTitle: "슬립(Slip) 스크린의 간파 요령",
        locationTipDesc: "스크리너가 몸을 제대로 닿지 않고 빠져나갈 때는 즉시 스크린 수비수가 뒤로 물러서며 골대 앞 공간을 선점해야 합니다!",
        voiceScript: "가짜 스크린을 걸고 골밑으로 빠지는 슬립 공격수는 골대 앞 공간을 먼저 선점해 가슴으로 막아서야 합니다!"
      },
      {
        id: 11,
        title: "2대2 파이트 스루(Fight Through) 탑 스크린 돌파 저지",
        shortName: "파이트 스루",
        situationDesc: "상대 슛 좋은 가드(#7)가 스크린(#9)을 타고 3점을 쏘려 해요! <strong>스크리너 앞쪽으로 몸을 밀어붙여(파이트스루)</strong> 슛을 막을 위치는?",
        attacker: { x: 330, y: 460, angle: -10, label: "스크린 탄 가드 #7" },
        axisTarget: { x: 330, y: 460 },
        otherPlayers: [
          { type: 'att', x: 280, y: 440, angle: 20, number: '9', name: '스크리너' },
          { type: 'def', x: 270, y: 390, angle: 170, number: '3', name: '스크린 수비 동료' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 340, y: 390, angle: 180, label: "스크리너 가슴 앞을 뚫고 나가 슛 견제", isCorrect: true, feedbackTitle: "투혼의 파이트 스루! 정답!", feedbackDesc: "스크린에 걸려 넘어지지 않고 스크리너 앞쪽으로 어깨를 먼저 집어넣어 슈터의 3점을 완벽히 막아냈어요!" },
          B: { x: 270, y: 470, angle: 180, label: "스크리너 뒤쪽으로 느긋하게 돌아가기", isCorrect: false, feedbackTitle: "오픈 3점슛 실점!", feedbackDesc: "스크리너 뒤로 돌아서 가면 슈터가 아무런 방해도 없이 편안하게 3점슛을 성공시켜요." },
          C: { x: 300, y: 220, angle: 180, label: "골밑으로 도망가기", isCorrect: false, feedbackTitle: "3점 폭격 헌납!", feedbackDesc: "골밑으로 물러서면 상대 가드가 여유롭게 3점슛을 넣어버려요." }
        },
        locationTipTitle: "슈터를 만났을 때는 파이트 스루!",
        locationTipDesc: "외곽 슛이 좋은 가드를 막을 때는 스크리너 뒤로 돌지 말고, 슬림하게 몸을 틀어 스크리너 앞을 비집고 나가야 합니다!",
        voiceScript: "슛이 좋은 가드를 막을 때는 스크리너 앞쪽을 뚫고 나가는 파이트 스루로 3점을 차단하세요!"
      },
      {
        id: 12,
        title: "2대2 언더(Under) 수비 (돌파형 가드 방어)",
        shortName: "언더 수비",
        situationDesc: "상대 가드(#7)는 슛은 없지만 돌파가 총알 같아요! <strong>스크리너(#9) 뒤쪽(언더)으로 돌아서</strong> 골밑 돌파를 막아낼 위치는?",
        attacker: { x: 340, y: 460, angle: -15, label: "돌파형 가드 #7" },
        axisTarget: { x: 300, y: 260 },
        otherPlayers: [
          { type: 'att', x: 290, y: 430, angle: 20, number: '9', name: '스크리너' },
          { type: 'def', x: 270, y: 380, angle: 160, number: '3', name: '스크린 수비 동료' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 360, y: 460, angle: -120, label: "스크리너 위로 무리하게 덤비기", isCorrect: false, feedbackTitle: "총알 돌파 허용!", feedbackDesc: "무리하게 스크린 위로 넘어가려다 발이 엉켜 상대의 번개 같은 돌파에 제쳐져요." },
          B: { x: 320, y: 370, angle: 180, label: "스크리너 뒤로 돌아 골밑 길목 선점", isCorrect: true, feedbackTitle: "지혜로운 언더 수비 성공!", feedbackDesc: "스크리너 뒤쪽의 지름길로 쏙 빠져나가 돌파하려던 가드의 앞길을 미리 가로막아냈어요!" },
          C: { x: 440, y: 380, angle: 150, label: "사이드라인 밖으로 피하기", isCorrect: false, feedbackTitle: "중앙 림 어택 허용!", feedbackDesc: "엉뚱한 곳으로 빠지면 공격수가 곧장 골밑으로 직진해요." }
        },
        locationTipTitle: "돌파형 선수를 상대할 때는 언더(Under)",
        locationTipDesc: "슛 성공률이 낮고 스피드만 빠른 가드는 스크리너 뒤쪽으로 여유롭게 돌아가 돌파 경로를 먼저 차단하는 것이 정답입니다!",
        voiceScript: "돌파가 빠른 가드를 막을 때는 스크리너 뒤쪽으로 돌아가 골밑 길목을 먼저 막아서세요!"
      },
      {
        id: 13,
        title: "2대2 드롭 커버리지(Drop Coverage) 빅맨 수비",
        shortName: "드롭 커버리지",
        situationDesc: "상대 픽앤롤 시, 당신은 <strong>골밑을 지키는 빅맨 수비수</strong>입니다! 가드의 돌파와 롤맨의 골밑 패스를 모두 견제할 위치는?",
        attacker: { x: 340, y: 440, angle: -20, label: "스크린 탄 가드 #7" },
        axisTarget: { x: 300, y: 220 },
        otherPlayers: [
          { type: 'att', x: 300, y: 360, angle: 0, number: '9', name: '골밑 롤맨' },
          { type: 'def', x: 360, y: 410, angle: 160, number: '3', name: '체이싱 가드 동료' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 340, y: 450, angle: 180, label: "3점 라인까지 튀어나가기", isCorrect: false, feedbackTitle: "골밑 백도어 앨리웁 허용!", feedbackDesc: "빅맨이 너무 높이 올라가면 뒤쪽 롤맨에게 프리패스가 들어가 덩크슛을 허용해요." },
          B: { x: 300, y: 80, angle: 180, label: "골대 바로 밑에 붙어있기", isCorrect: false, feedbackTitle: "자유투 라인 플로터 허용!", feedbackDesc: "너무 깊숙이 들어가면 상대 가드가 여유롭게 자유투 라인 플로터를 성공시켜요." },
          C: { x: 310, y: 240, angle: 180, label: "자유투 서클 부근에서 둘 다 견제 (드롭)", isCorrect: true, feedbackTitle: "현대 농구 정석 드롭 커버리지!", feedbackDesc: "자유투 서클 앞에서 가드의 돌파 길을 가로막으면서도 뒤로 빠지는 롤맨 패스를 긴 팔로 완벽히 견제했어요!" }
        },
        locationTipTitle: "드롭(Drop) 커버리지의 거리감",
        locationTipDesc: "빅맨은 너무 올라가지도, 너무 처지지도 않는 자유투 라인과 페인트존 사이에서 양팔을 벌려 두 공격수를 동시에 제어해야 합니다!",
        voiceScript: "빅맨의 드롭 커버리지는 자유투 라인 부근에서 양팔을 벌려 가드의 돌파와 롤맨의 패스를 동시에 견제해야 합니다!"
      },
      {
        id: 14,
        title: "2대2 헷지 앤드 리커버(Hedge & Recover)",
        shortName: "헷지 & 리커버",
        situationDesc: "상대 가드의 픽앤롤 돌파를 빅맨인 당신이 <strong>몸으로 순간 튀어나와 멈추게 한 뒤(Hedge)</strong> 복귀하려 해요! 헷지 위치는?",
        attacker: { x: 350, y: 450, angle: -20, label: "돌파하려는 가드 #7" },
        axisTarget: { x: 350, y: 450 },
        otherPlayers: [
          { type: 'att', x: 280, y: 420, angle: 10, number: '9', name: '스크리너' },
          { type: 'def', x: 320, y: 460, angle: 180, number: '3', name: '체이싱 동료 가드' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 360, y: 420, angle: 150, label: "가드의 돌파로에 몸을 불쑥 내밀기 (헷지)", isCorrect: true, feedbackTitle: "완벽한 헷지 타이밍!", feedbackDesc: "가드의 돌파 각도를 순간 몸으로 튕겨내어 드리블을 멈추게 한 뒤, 내 선수에게 번개같이 복귀할 수 있는 이상적 위치예요!" },
          B: { x: 260, y: 350, angle: 180, label: "스크리너 뒤에 숨어있기", isCorrect: false, feedbackTitle: "가드 프리 돌파 허용!", feedbackDesc: "숨어있으면 상대 가드가 스크린을 타고 곧장 레이업을 꽂아넣어요." },
          C: { x: 300, y: 150, angle: 180, label: "골밑에서 멀뚱히 서기", isCorrect: false, feedbackTitle: "도움 수비 실패!", feedbackDesc: "가드가 마음껏 슛을 던질 수 있는 공간을 내주게 돼요." }
        },
        locationTipTitle: "헷지(Hedge)의 원칙: 1초만 버티고 복귀!",
        locationTipDesc: "헷지는 가드를 막아주는 척 1초 동안 돌파 각도만 좁혀주고, 우리 가드가 따라붙으면 즉시 내 마크맨에게 총알같이 복귀해야 합니다!",
        voiceScript: "헷지는 가드의 돌파 길에 순간 몸을 불쑥 내밀어 멈추게 한 뒤, 즉시 자기 선수에게 복귀하는 것이 핵심입니다!"
      },
      {
        id: 15,
        title: "2대2 아이스(Ice/Blue) 사이드라인 몰기",
        shortName: "아이스 수비",
        situationDesc: "사이드 45도에서 픽앤롤이 시작됐어요! 가드가 위험한 코트 중앙으로 들어오지 못하게 <strong>사이드라인 쪽으로 몰아붙일 위치</strong>는?",
        attacker: { x: 440, y: 410, angle: -30, label: "윙 가드 #7" },
        axisTarget: { x: 440, y: 410 },
        otherPlayers: [
          { type: 'att', x: 380, y: 430, angle: 0, number: '9', name: '탑 스크리너' },
          { type: 'def', x: 390, y: 330, angle: 150, number: '3', name: '빅맨 동료' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 460, y: 400, angle: -90, label: "사이드라인 쪽에 서서 중앙을 열어주기", isCorrect: false, feedbackTitle: "중앙 고속도로 돌파 허용!", feedbackDesc: "가장 위험한 코트 중앙을 열어주면 가드가 유유히 골밑으로 파고들어요." },
          B: { x: 400, y: 390, angle: 130, label: "중앙 쪽 진로를 몸으로 막고 사이드로 유도", isCorrect: true, feedbackTitle: "전술의 완성, 아이스(Ice) 디펜스!", feedbackDesc: "스크린을 쓰지 못하게 중앙 각도를 몸으로 틀어막아 가드를 좁은 사이드라인 구석으로 몰아냈어요!" },
          C: { x: 300, y: 200, angle: 180, label: "골밑으로 줄행랑치기", isCorrect: false, feedbackTitle: "오픈 점퍼 허용!", feedbackDesc: "가드가 자유롭게 슛을 쏠 수 있는 거리를 헌납해요." }
        },
        locationTipTitle: "아이스(Ice) 수비: 중앙은 절대 금지!",
        locationTipDesc: "사이드 픽앤롤에서는 수비수의 몸통을 중앙 쪽으로 비스듬히 세워 공격수가 스크린을 못 타고 사이드라인으로만 달리게 만드세요!",
        voiceScript: "사이드 픽앤롤에서는 중앙 쪽을 가슴으로 틀어막아 공격수를 사이드라인 구석으로 몰아붙이세요!"
      },
      {
        id: 16,
        title: "2대2 스위치 미스매치 프론팅(Fronting) 골밑 수비",
        shortName: "미스매치 프론팅",
        situationDesc: "스위치 후 키 작은 가드인 당신이 <strong>상대 골밑 장신 센터(#9)</strong>와 매치업됐어요! 키 차이를 극복하고 패스를 막을 위치는?",
        attacker: { x: 300, y: 470, angle: 0, label: "탑 패서 가드 #7" },
        axisTarget: { x: 260, y: 180 },
        otherPlayers: [
          { type: 'att', x: 260, y: 180, angle: 80, number: '9', name: '골밑 장신 센터' },
          { type: 'def', x: 300, y: 400, angle: 180, number: '3', name: '외곽 빅맨 동료' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 275, y: 220, angle: 180, label: "센터 앞을 가로막는 프론팅(Fronting) 자세", isCorrect: true, feedbackTitle: "지혜로운 프론트 디나이 성공!", feedbackDesc: "등 뒤에서 밀리지 않고 센터의 앞쪽에서 두 팔을 벌려 공이 골밑으로 들어오는 길목 자체를 원천 차단했어요!" },
          B: { x: 230, y: 150, angle: 0, label: "등 뒤에서 힘으로 밀어내려 하기", isCorrect: false, feedbackTitle: "키 차이로 완패 & 덩크 허용!", feedbackDesc: "등 뒤에 서 있으면 상대 빅맨이 키 차이를 이용해 머리 위로 공을 받아 가볍게 득점해요." },
          C: { x: 380, y: 300, angle: 180, label: "외곽으로 도망가기", isCorrect: false, feedbackTitle: "노마크 골밑 실점!", feedbackDesc: "골밑을 비워두면 쉬운 득점을 내줘요." }
        },
        locationTipTitle: "미스매치 극복 비법: 프론트(Front) 수비",
        locationTipDesc: "나보다 훨씬 큰 선수가 골밑에 있을 때는 뒤에서 막지 말고, 공격수 앞쪽에 서서 패스가 아예 들어오지 못하게 막아야 합니다!",
        voiceScript: "키 큰 선수를 골밑에서 막을 때는 등 뒤에서 밀리지 말고 앞쪽에 서서 패스를 원천 차단하세요!"
      },
      {
        id: 17,
        title: "2대2 기브 앤 고 리버스 컷(Reverse Cut) 차단",
        shortName: "리버스 컷 차단",
        situationDesc: "상대 공격수(#9)가 외곽으로 빠지는 척하다가 <strong>급격히 방향을 틀어 골밑 반대편으로 리버스 컷</strong>을 해요! 차단 위치는?",
        attacker: { x: 220, y: 420, angle: 30, label: "패서 가드 #7" },
        axisTarget: { x: 300, y: 220 },
        otherPlayers: [
          { type: 'att', x: 330, y: 260, angle: -45, number: '9', name: '리버스 컷인 공격수' },
          { type: 'def', x: 240, y: 360, angle: -150, number: '3', name: '패서 수비 동료' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 420, y: 400, angle: 180, label: "가짜 외곽 페이크 쫓아가기", isCorrect: false, feedbackTitle: "반대편 컷인 방치!", feedbackDesc: "가짜 방향으로 쫓아가면 뒤쪽 골밑으로 파고든 공격수에게 완벽한 레이업을 내줘요." },
          B: { x: 220, y: 440, angle: 0, label: "패서에게 공 뺏으러 가기", isCorrect: false, feedbackTitle: "원패스 실점!", feedbackDesc: "공만 보고 달려들면 리버스 컷인한 선수에게 앨리웁 패스가 들어가요." },
          C: { x: 310, y: 210, angle: 140, label: "골대 앞 페인트존 길목을 선제 차단", isCorrect: true, feedbackTitle: "완벽한 리버스 컷 간파!", feedbackDesc: "가짜 방향 전환에 속지 않고 골대 앞 중심 진로를 먼저 몸으로 가로막아 안전하게 막아냈어요!" }
        },
        locationTipTitle: "리버스 컷(Reverse Cut)의 요령",
        locationTipDesc: "공격수가 지그재그로 방향을 바꿀 때는 발을 보지 말고, 최종 목적지인 골대 앞 공간을 먼저 선점해 가슴으로 막으세요!",
        voiceScript: "방향을 꺾어 들어오는 리버스 컷인은 최종 목적지인 골대 앞 공간을 먼저 몸으로 가로막아야 합니다!"
      },
      {
        id: 18,
        title: "2대2 미드레인지 풀업 점퍼 견제",
        shortName: "풀업 점퍼 견제",
        situationDesc: "상대 가드(#7)가 스크린을 살짝 타고 <strong>자유투 라인 정면에서 급정거 풀업 점퍼</strong>를 쏘려 해요! 스크리너 수비수의 위치는?",
        attacker: { x: 300, y: 310, angle: 0, label: "풀업 점퍼 가드 #7" },
        axisTarget: { x: 300, y: 310 },
        otherPlayers: [
          { type: 'att', x: 260, y: 360, angle: 30, number: '9', name: '스크리너' },
          { type: 'def', x: 330, y: 360, angle: 170, number: '3', name: '뒤쫓는 가드 동료' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 300, y: 120, angle: 180, label: "골대 밑으로 너무 깊이 후퇴하기", isCorrect: false, feedbackTitle: "오픈 미들 점퍼 실점!", feedbackDesc: "골밑까지 물러서면 상대 가드가 자유투 라인에서 편안하게 점프슛을 성공시켜요." },
          B: { x: 300, y: 235, angle: 180, label: "팔 하나 거리에서 하이핸드로 슛 시야 방해", isCorrect: true, feedbackTitle: "교과서적인 풀업 견제!", feedbackDesc: "골밑을 지키면서도 한 발 앞으로 전진해 한 손을 높이 들어 상대 점프슛 시야를 완벽히 가렸어요!" },
          C: { x: 300, y: 310, angle: 180, label: "슛 쏘는 공중으로 몸 날리기", isCorrect: false, feedbackTitle: "슈팅 파울 & 앤드원 허용!", feedbackDesc: "무리하게 몸을 날리면 슈팅 파울을 범해 추가 자유투를 내주게 돼요." }
        },
        locationTipTitle: "풀업 점퍼 수비는 하이핸드(High Hand)",
        locationTipDesc: "급정거 점프슛을 막을 때는 블록을 노리고 뛰지 말고, 팔 하나 거리에서 손을 번쩍 들어 림 시야만 가려주세요!",
        voiceScript: "상대의 급정거 점프슛에는 뛰지 말고 손을 높이 들어 림 시야를 가리는 하이핸드가 최고입니다!"
      },
      {
        id: 19,
        title: "2대2 숏롤(Short Roll) 4대3 찬스 차단",
        shortName: "숏롤 차단",
        situationDesc: "롤맨(#9)이 골밑 끝까지 안 가고 <strong>자유투 라인 한가운데(숏롤)</strong>에서 패스를 받아 플레이를 하려 해요! 차단 위치는?",
        attacker: { x: 230, y: 440, angle: 30, label: "패서 가드 #7" },
        axisTarget: { x: 300, y: 320 },
        otherPlayers: [
          { type: 'att', x: 300, y: 320, angle: 0, number: '9', name: '숏롤 빅맨' },
          { type: 'def', x: 240, y: 380, angle: -150, number: '3', name: '가드 수비 동료' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 240, angle: 180, label: "숏롤 빅맨 앞을 가로막고 슛과 패스 동시 견제", isCorrect: true, feedbackTitle: "현대 전술 숏롤 완벽 봉쇄!", feedbackDesc: "자유투 라인에서 편안하게 공을 만지지 못하도록 앞을 틀어막아 후속 공격 전개를 차단했어요!" },
          B: { x: 300, y: 90, angle: 180, label: "골대 바로 밑에서 멀뚱히 서기", isCorrect: false, feedbackTitle: "자유투 라인 오픈 슛 허용!", feedbackDesc: "골밑에 박혀 있으면 숏롤러가 편안하게 중거리 점퍼를 꽂아넣어요." },
          C: { x: 420, y: 350, angle: 180, label: "반대편 외곽으로 빠지기", isCorrect: false, feedbackTitle: "중앙 붕괴!", feedbackDesc: "중앙을 비워두면 숏롤러가 직접 돌파해 덩크를 꽂아요." }
        },
        locationTipTitle: "숏롤(Short Roll) 무력화 비법",
        locationTipDesc: "상대 빅맨이 골밑 대신 자유투 라인에 멈춰 공을 잡으려 할 때는 즉시 거리를 좁혀 패스와 슛 진로를 가슴으로 막으세요!",
        voiceScript: "자유투 라인에서 공을 잡으려는 숏롤 빅맨에게는 빠르게 다가가 패스와 슛 진로를 몸으로 막아야 합니다!"
      },
      {
        id: 20,
        title: "2대2 엔드라인 턴오버 유발 협력 압박",
        shortName: "엔드라인 턴오버 압박",
        situationDesc: "상대 2명이 코너 구석에 몰렸어요! <strong>5초 바이얼레이션을 유도해 공을 빼앗아올</strong> 완벽한 더블팀 협력 위치는?",
        attacker: { x: 490, y: 220, angle: -80, label: "코너에 갇힌 가드 #7" },
        axisTarget: { x: 490, y: 220 },
        otherPlayers: [
          { type: 'att', x: 420, y: 150, angle: 0, number: '9', name: '패스 못 받는 동료' },
          { type: 'def', x: 450, y: 160, angle: 110, number: '3', name: '디나이 수비 동료' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 300, y: 300, angle: 180, label: "중앙에서 관전하기", isCorrect: false, feedbackTitle: "압박 찬스 무산!", feedbackDesc: "상대가 코너에 갇혔을 때 거리를 좁히지 않으면 탈출 패스를 허용해요." },
          B: { x: 440, y: 240, angle: 120, label: "양팔을 풍차처럼 흔들며 중앙 탈출로 완전 봉쇄", isCorrect: true, feedbackTitle: "5초 바이얼레이션 & 승리 확정!", feedbackDesc: "사이드라인과 엔드라인에 갇힌 상대를 완벽히 가두어 패스 길목을 지우고 5초 바이얼레이션을 이끌어냈어요!" },
          C: { x: 520, y: 220, angle: 90, label: "라인 밖에서 상대를 밀치기", isCorrect: false, feedbackTitle: "푸싱 파울!", feedbackDesc: "손이나 몸으로 상대를 밀면 파울이 불려 공격권을 뺏지 못해요." }
        },
        locationTipTitle: "코너 갇힘 = 100% 턴오버 찬스!",
        locationTipDesc: "사이드라인과 엔드라인이 만나는 코너는 공격수의 지옥입니다! 손을 위아래로 흔들며 벽을 세우면 패스할 곳이 없어져요!",
        voiceScript: "코너에 갇힌 공격수에게는 양팔을 크게 흔들며 탈출로를 완전히 막아 턴오버를 유도하세요!"
      }
    ],

    // ---------------- 3대3 반코트 모드 (20문제) ----------------
    '3v3': [
      {
        id: 1,
        title: "3대3 수비 삼각형 (Defense Triangle)",
        shortName: "수비 삼각형",
        situationDesc: "탑(#7)에 공이 있고 동료가 막고 있어요. 당신은 <strong>반대편 왼쪽 윙 공격수(#9)</strong>를 맡고 있습니다. 올바른 위치는?",
        attacker: { x: 300, y: 470, angle: 0, label: "탑 공 소유 (#7)" },
        axisTarget: { x: 150, y: 400 },
        otherPlayers: [
          { type: 'att', x: 440, y: 400, angle: -30, number: '8', name: '우측 윙' },
          { type: 'att', x: 150, y: 400, angle: 30, number: '9', name: '내 마크맨' },
          { type: 'def', x: 300, y: 390, angle: 180, number: '1', name: '동료 수비 1' },
          { type: 'def', x: 390, y: 340, angle: 150, number: '2', name: '동료 수비 2' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 220, y: 330, angle: 140, label: "공과 마크맨 동시 시야 (삼각형)", isCorrect: true, feedbackTitle: "완벽한 수비 삼각형!", feedbackDesc: "공의 움직임과 내 마크맨을 동시에 보면서 골밑 헬프까지 준비하는 명당이에요!" },
          B: { x: 140, y: 420, angle: -150, label: "내 마크맨에게만 꼭 붙기", isCorrect: false, feedbackTitle: "공이 전혀 안 보여요!", feedbackDesc: "마크맨만 보고 있으면 공이 어디로 가는지, 동료가 뚫렸는지 전혀 알 수 없어요." },
          C: { x: 300, y: 150, angle: 180, label: "골대 밑에 혼자 서기", isCorrect: false, feedbackTitle: "내 선수가 완전 오픈!", feedbackDesc: "너무 멀리 떨어지면 내 마크맨에게 패스가 갔을 때 막을 수 없어요." }
        },
        locationTipTitle: "수비 삼각형(Defense Triangle)의 법칙",
        locationTipDesc: "공이 내 마크맨에게 없을 때는 한 손은 '공', 다른 한 손은 '내 마크맨'을 가리키는 삼각형의 꼭짓점에 서서 양쪽을 다 봐야 해요!",
        voiceScript: "3대3에서는 공과 내 마크맨을 모두 시야에 두는 수비 삼각형 위치를 지키는 것이 가장 중요합니다!"
      },
      {
        id: 2,
        title: "3대3 위크사이드 페인트존 보호",
        shortName: "위크사이드 보호",
        situationDesc: "공이 오른쪽 코너(#8)로 들어갔어요! 반대편 왼쪽 외곽을 맡은 <strong>당신(위크사이드 수비수)의 최선의 위치는?</strong>",
        attacker: { x: 530, y: 180, angle: -80, label: "코너 공 소유 (#8)" },
        axisTarget: { x: 140, y: 360 },
        otherPlayers: [
          { type: 'att', x: 300, y: 450, angle: 0, number: '7', name: '탑 공격수' },
          { type: 'att', x: 140, y: 360, angle: 30, number: '9', name: '반대편 마크맨' },
          { type: 'def', x: 460, y: 160, angle: 100, number: '1', name: '코너 수비' },
          { type: 'def', x: 300, y: 370, angle: 180, number: '2', name: '탑 수비' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 130, y: 380, angle: -150, label: "외곽 마크맨에게 붙어있기", isCorrect: false, feedbackTitle: "골밑이 텅 비었어요!", feedbackDesc: "공이 반대편에 있을 때는 골밑을 커버해 줘야 팀이 실점하지 않아요." },
          B: { x: 480, y: 220, angle: 120, label: "코너로 우르르 달려가기", isCorrect: false, feedbackTitle: "반대편 전체가 노마크!", feedbackDesc: "코너는 이미 동료가 막고 있어요. 반대편 패스 한 방에 3점을 줘요." },
          C: { x: 260, y: 210, angle: 130, label: "페인트존 중앙으로 좁혀서 보호", isCorrect: true, feedbackTitle: "최고의 페인트존 수호자!", feedbackDesc: "공 반대편에서 중앙 페인트존까지 좁혀들어와 상대 골밑 침투를 완벽히 막았어요!" }
        },
        locationTipTitle: "위크사이드(Weak Side) 수비 위치",
        locationTipDesc: "공이 반대편(스트롱사이드)에 있을 때는 과감하게 페인트존 쪽으로 좁혀들어와 골밑을 철통 방어하세요!",
        voiceScript: "공이 반대편에 있을 때는 페인트존 중앙까지 좁혀서 골밑을 보호하는 위크사이드 수비를 펼치세요!"
      },
      {
        id: 3,
        title: "3대3 백도어 컷(Backdoor) 차단",
        shortName: "백도어 차단",
        situationDesc: "왼쪽 윙의 공격수(#9)가 공을 받으러 나오는 척하다가 갑자기 골밑 뒤쪽으로 꺾어 파고듭니다! <strong>어디로 반응해야 할까요?</strong>",
        attacker: { x: 300, y: 470, angle: 0, label: "패스 주려는 #7" },
        axisTarget: { x: 180, y: 260 },
        otherPlayers: [
          { type: 'att', x: 440, y: 400, angle: -30, number: '8', name: '우측 윙' },
          { type: 'att', x: 180, y: 280, angle: 10, number: '9', name: '백도어 침투 중' },
          { type: 'def', x: 300, y: 390, angle: 180, number: '1', name: '탑 수비' },
          { type: 'def', x: 390, y: 340, angle: 150, number: '2', name: '우측 수비' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 130, y: 380, angle: 180, label: "외곽 3점 라인에 멍하니 서기", isCorrect: false, feedbackTitle: "골밑 백도어 레이업 허용!", feedbackDesc: "외곽에 서 있으면 뒤로 파고든 공격수가 쉬운 레이업을 넣어요." },
          B: { x: 210, y: 200, angle: 150, label: "골대 쪽으로 몸 돌려 길목 선점", isCorrect: true, feedbackTitle: "환상적인 백도어 차단!", feedbackDesc: "속임수에 속지 않고 골대 방향으로 먼저 발을 딛어 골밑 패스를 막아냈어요!" },
          C: { x: 270, y: 420, angle: 0, label: "탑 공 쪽으로 손 뻗기", isCorrect: false, feedbackTitle: "뒤통수를 완전히 털렸어요!", feedbackDesc: "달려드는 공격수의 진로를 먼저 몸으로 막아야 해요." }
        },
        locationTipTitle: "백도어 컷 수비의 핵심 스텝",
        locationTipDesc: "공격수가 내 등 뒤로 파고들 때는 머리를 돌려 시선을 유지하고, 골대 쪽으로 헤드 턴(Head Turn)하여 골밑 길목을 먼저 장악하세요!",
        voiceScript: "백도어 컷이 들어올 때는 골대 방향으로 빠르게 몸을 돌려 골밑 길목을 먼저 장악해야 합니다!"
      },
      {
        id: 4,
        title: "3대3 스위치(Switch) 수비",
        shortName: "스위치 수비",
        situationDesc: "공격수 7번과 9번이 서로 교차하며 엇갈려 달렸어요! <strong>동료가 '스위치!'를 외쳤을 때 당신의 행동은?</strong>",
        attacker: { x: 360, y: 380, angle: -20, label: "돌파해 오는 #7" },
        axisTarget: { x: 360, y: 380 },
        otherPlayers: [
          { type: 'att', x: 220, y: 400, angle: 40, number: '9', name: '외곽 빠지는 9' },
          { type: 'att', x: 480, y: 350, angle: -50, number: '8', name: '우측 코너' },
          { type: 'def', x: 260, y: 380, angle: -150, number: '1', name: '스위치 외친 동료' },
          { type: 'def', x: 440, y: 300, angle: 140, number: '2', name: '코너 수비' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 330, y: 310, angle: 160, label: "돌파해 오는 7번을 바로 이어받아 수비", isCorrect: true, feedbackTitle: "완벽한 스위치 디펜스!", feedbackDesc: "동료의 콜에 맞춰 골밑으로 오는 더 위험한 공격수를 즉시 이어받아 막았어요!" },
          B: { x: 190, y: 380, angle: 180, label: "원래 내 마크맨(9번) 쫓아가기", isCorrect: false, feedbackTitle: "동료와 엉켜서 둘 다 뚫림!", feedbackDesc: "스위치 콜이 나왔을 때는 서로 사람을 바꿔서 막아야 해요." },
          C: { x: 300, y: 100, angle: 180, label: "누가 막을지 몰라 멈칫하기", isCorrect: false, feedbackTitle: "노마크 슛 허용!", feedbackDesc: "망설이는 1초 사이에 상대가 슛을 던져요." }
        },
        locationTipTitle: "스위치(Switch) 디펜스 소통법",
        locationTipDesc: "두 공격수가 엇갈릴 때는 서로 사람을 바꾸는 '스위치!'를 큰 소리로 외치고, 골밑으로 침투하는 선수를 지체 없이 이어받으세요!",
        voiceScript: "스위치 상황에서는 큰 소리로 외치며 골밑으로 오는 더 위험한 공격수를 즉시 이어받아 수비하세요!"
      },
      {
        id: 5,
        title: "3대3 슛 후 박스아웃(Box-out)",
        shortName: "박스아웃",
        situationDesc: "탑에서 3점슛이 올라갔어요! 공이 림을 향해 날아가는 순간, <strong>골밑 근처에 있는 당신의 최선의 행동은?</strong>",
        attacker: { x: 300, y: 480, angle: 0, label: "슛 던진 #7 (빨강)" },
        axisTarget: { x: 280, y: 160 },
        otherPlayers: [
          { type: 'att', x: 260, y: 220, angle: 0, number: '9', name: '리바운드 침투 중' },
          { type: 'att', x: 440, y: 360, angle: -30, number: '8', name: '외곽 공격수' },
          { type: 'def', x: 300, y: 400, angle: 180, number: '1', name: '탑 수비' },
          { type: 'def', x: 400, y: 300, angle: 140, number: '2', name: '외곽 수비' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 300, y: 100, angle: 0, label: "공만 쳐다보고 높이 점프하기", isCorrect: false, feedbackTitle: "뒤에서 공격수가 팁인 득점!", feedbackDesc: "공만 보고 뛰면 뒤에서 달려드는 공격수에게 리바운드를 빼앗겨요." },
          B: { x: 200, y: 280, angle: 180, label: "속공 나가려고 미리 뛰기", isCorrect: false, feedbackTitle: "공을 아직 못 잡았어요!", feedbackDesc: "리바운드를 완전히 잡기 전에 먼저 뛰어나가면 안 돼요." },
          C: { x: 270, y: 170, angle: 170, label: "내 마크맨을 등으로 막고(박스아웃) 공간 확보", isCorrect: true, feedbackTitle: "리바운드의 제왕! 박스아웃 성공!", feedbackDesc: "엉덩이를 낮추고 상대를 등으로 밀어내며 골밑 공을 안전하게 확보했어요!" }
        },
        locationTipTitle: "박스아웃(Box-Out) 3단계",
        locationTipDesc: "1. 슛이 뜨면 상대를 먼저 찾는다! 2. 몸과 엉덩이로 상대를 가로막는다! 3. 공이 튀어나올 때 두 손으로 꽉 잡는다!",
        voiceScript: "슛이 올라갔을 때는 공만 보지 말고, 몸으로 상대를 먼저 가로막는 박스아웃을 한 뒤 리바운드를 잡으세요!"
      },
      {
        id: 6,
        title: "3대3 드리블 핸드오프(Hand-Off) 방어",
        shortName: "핸드오프 방어",
        situationDesc: "드리블러(#7)가 윙의 동료(#8)에게 손으로 공을 건네며(DHO) <strong>몸으로 수비수를 스크린</strong>해요! 당신의 수비 위치는?",
        attacker: { x: 380, y: 390, angle: -30, label: "공 건네는 #7" },
        axisTarget: { x: 420, y: 360 },
        otherPlayers: [
          { type: 'att', x: 430, y: 370, angle: -40, number: '8', name: '공 받는 슈터' },
          { type: 'att', x: 180, y: 380, angle: 30, number: '9', name: '반대편 윙' },
          { type: 'def', x: 340, y: 350, angle: 140, number: '1', name: '드리블 수비' },
          { type: 'def', x: 230, y: 330, angle: -140, number: '2', name: '약측 수비' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 390, y: 315, angle: 140, label: "스크린 위를 타고 넘어 슛 방해 (오버)", isCorrect: true, feedbackTitle: "환상적인 핸드오프 방어!", feedbackDesc: "스크린 위를 굳건히 타고 넘어가 공을 이어받자마자 던지는 슛과 원투 드라이브를 완벽히 막았어요!" },
          B: { x: 470, y: 390, angle: -90, label: "사이드라인 쪽으로 밀려나기", isCorrect: false, feedbackTitle: "중앙 슛 허용!", feedbackDesc: "사이드로 밀려나면 슈터가 중앙 쪽으로 편안하게 점프슛을 올려요." },
          C: { x: 300, y: 200, angle: 180, label: "골밑으로 도망가기", isCorrect: false, feedbackTitle: "오픈 3점슛 헌납!", feedbackDesc: "거리가 너무 멀어 상대 슈터가 노마크 3점을 손쉽게 꽂아넣어요." }
        },
        locationTipTitle: "핸드오프(DHO) 수비의 요령",
        locationTipDesc: "핸드오프는 매우 빠르고 위협적이에요! 슈터의 수비수는 스크리너 위를 바짝 붙어 넘어가며 슛 타이밍을 뺏어야 합니다.",
        voiceScript: "드리블 핸드오프 상황에서는 스크린 위를 타고 넘어가며 공을 받는 슈터의 슛 타이밍을 가로막아야 합니다!"
      },
      {
        id: 7,
        title: "3대3 플레어 스크린(Flare Screen) 외곽 방어",
        shortName: "플레어 스크린",
        situationDesc: "상대 공격수(#8)가 스크린을 등 뒤로 끼고 <strong>반대편 45도 외곽으로 빙 돌아 빠져나가며 3점</strong>을 노려요! 당신의 위치는?",
        attacker: { x: 300, y: 470, angle: 0, label: "패서 #7 (탑)" },
        axisTarget: { x: 440, y: 420 },
        otherPlayers: [
          { type: 'att', x: 440, y: 420, angle: -30, number: '8', name: '플레어 슈터' },
          { type: 'att', x: 360, y: 360, angle: -45, number: '9', name: '스크리너' },
          { type: 'def', x: 300, y: 400, angle: 180, number: '1', name: '탑 수비' },
          { type: 'def', x: 330, y: 310, angle: 150, number: '2', name: '스크린 수비' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 300, y: 250, angle: 180, label: "골밑에서 서성거리기", isCorrect: false, feedbackTitle: "완전 오픈 3점 폭격!", feedbackDesc: "외곽으로 빠진 슈터를 쫓아가지 않으면 상대가 노마크 3점을 적중시켜요." },
          B: { x: 360, y: 390, angle: 180, label: "스크리너에게 정면 충돌하기", isCorrect: false, feedbackTitle: "스크린에 쾅! 지각 수비!", feedbackDesc: "스크리너와 부딪히면 몸이 멈춰 슈터에게 날아간 공을 막을 수 없어요." },
          C: { x: 410, y: 350, angle: 150, label: "스크린을 바깥으로 우회해 슛 콘테스트", isCorrect: true, feedbackTitle: "완벽한 플레어 스크린 탈출!", feedbackDesc: "스크린을 영리하게 우회해 외곽으로 뛰쳐나와 공을 받자마자 쏘는 3점슛을 높은 손으로 막아냈어요!" }
        },
        locationTipTitle: "플레어 스크린(Flare Screen) 대처법",
        locationTipDesc: "공과 멀어지며 외곽으로 빠지는 슈터를 막을 때는 스크린에 걸리지 않도록 한 발 뒤로 빼며 슈터의 착지 지점으로 빠르게 이동하세요!",
        voiceScript: "외곽으로 빠져나가는 플레어 슈터를 막을 때는 스크린을 재빨리 우회해 손을 뻗어 슛을 견제해야 합니다!"
      },
      {
        id: 8,
        title: "3대3 헬프 앤드 리커버 (Help & Recover)",
        shortName: "헬프 & 리커버",
        situationDesc: "상대 에이스(#7)가 중앙으로 돌파해 들어와요! <strong>찰나의 순간 길을 막고(스턴트) 내 마크맨에게 복귀할 위치는?</strong>",
        attacker: { x: 280, y: 360, angle: 10, label: "중앙 돌파 #7" },
        axisTarget: { x: 280, y: 360 },
        otherPlayers: [
          { type: 'att', x: 440, y: 380, angle: -30, number: '8', name: '내 마크맨' },
          { type: 'att', x: 160, y: 380, angle: 30, number: '9', name: '좌측 윙' },
          { type: 'def', x: 250, y: 390, angle: 170, number: '1', name: '돌파당한 동료' },
          { type: 'def', x: 210, y: 320, angle: -140, number: '2', name: '좌측 수비' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 270, y: 340, angle: 180, label: "돌파자에게 아예 달려들어 올인하기", isCorrect: false, feedbackTitle: "외곽 3점슛 헌납!", feedbackDesc: "완전히 달라붙으면 돌파자가 외곽의 내 마크맨에게 패스를 빼줘 오픈 3점을 맞아요." },
          B: { x: 350, y: 320, angle: 160, label: "돌파로에 한 발 걸친 후 복귀 준비 (스턴트)", isCorrect: true, feedbackTitle: "프로급 헬프 앤드 리커버!", feedbackDesc: "가짜 도움 수비(스턴트)로 돌파자의 발을 멈추게 한 뒤, 내 마크맨 쪽으로 언제든 튀어나갈 수 있는 황금 위치예요!" },
          C: { x: 460, y: 390, angle: -60, label: "내 마크맨만 붙잡고 돌파 구경하기", isCorrect: false, feedbackTitle: "중앙 프리 레이업 허용!", feedbackDesc: "동료가 뚫렸는데 아무런 도움도 주지 않으면 손쉬운 골밑 득점을 내줘요." }
        },
        locationTipTitle: "스턴트(Stunt)와 페이크 헬프",
        locationTipDesc: "돌파로에 몸을 반쯤 들이밀어 상대 드리블을 멈추게 만들고, 패스가 나가는 순간 용수철처럼 내 선수에게 복귀하세요!",
        voiceScript: "돌파 길목에 반 발을 걸쳐 상대를 멈추게 한 뒤, 신속히 자기 마크맨에게 복귀하는 헬프 앤드 리커버가 필수입니다!"
      },
      {
        id: 9,
        title: "3대3 베이스라인 컷인 차단 (Baseline Cut)",
        shortName: "베이스라인 컷",
        situationDesc: "탑에서 공이 돌 때, 코너의 공격수(#8)가 <strong>골대 뒤 베이스라인을 타고 림으로 기습 쇄도</strong>해요! 당신의 수비 위치는?",
        attacker: { x: 300, y: 470, angle: 0, label: "탑 공 소유 #7" },
        axisTarget: { x: 360, y: 170 },
        otherPlayers: [
          { type: 'att', x: 410, y: 180, angle: -70, number: '8', name: '베이스라인 컷인' },
          { type: 'att', x: 160, y: 390, angle: 30, number: '9', name: '좌측 윙' },
          { type: 'def', x: 300, y: 400, angle: 180, number: '1', name: '탑 수비' },
          { type: 'def', x: 210, y: 330, angle: -140, number: '2', name: '좌측 수비' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 340, y: 160, angle: 130, label: "골밑 앞 페인트존 길목 선점", isCorrect: true, feedbackTitle: "완벽한 컷인 차단!", feedbackDesc: "베이스라인을 파고드는 공격수의 앞길을 골밑 바로 앞에서 몸으로 가로막아 안전하게 차단했어요!" },
          B: { x: 460, y: 220, angle: 180, label: "외곽 코너에 우두커니 서있기", isCorrect: false, feedbackTitle: "원패스 골밑 레이업 허용!", feedbackDesc: "외곽에 서 있으면 이미 골밑으로 파고든 공격수에게 앨리웁이나 손쉬운 득점을 내줘요." },
          C: { x: 300, y: 430, angle: 180, label: "탑의 볼만 보러 올라가기", isCorrect: false, feedbackTitle: "골밑 실점 헌납!", feedbackDesc: "공만 쳐다보고 올라가면 뒤쪽 골밑이 텅 비어 실점해요." }
        },
        locationTipTitle: "베이스라인 컷(Baseline Cut) 방어 비결",
        locationTipDesc: "공격수가 베이스라인으로 뛸 때는 무조건 골대 앞 페인트존 공간을 먼저 차지해 가슴으로 막아서야 합니다!",
        voiceScript: "베이스라인을 타고 뛰어드는 공격수는 골대 앞 공간을 먼저 선점해 몸으로 길을 막아야 합니다!"
      },
      {
        id: 10,
        title: "3대3 엑스트라 패스 로테이션 (Extra Pass Rotation)",
        shortName: "엑스트라 패스",
        situationDesc: "공이 탑에서 윙을 거쳐 <strong>코너 슈터(#8)에게 총알처럼 연속 패스</strong>되었어요! 오픈 3점을 막을 당신의 긴급 클로즈아웃 위치는?",
        attacker: { x: 480, y: 170, angle: -70, label: "코너 공 소유 #8" },
        axisTarget: { x: 480, y: 170 },
        otherPlayers: [
          { type: 'att', x: 300, y: 470, angle: 0, number: '7', name: '탑' },
          { type: 'att', x: 430, y: 360, angle: -30, number: '9', name: '패스 거쳐간 윙' },
          { type: 'def', x: 300, y: 400, angle: 180, number: '1', name: '탑 수비' },
          { type: 'def', x: 370, y: 300, angle: 140, number: '2', name: '윙 수비' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 300, y: 150, angle: 180, label: "골대 밑에서 지켜보기", isCorrect: false, feedbackTitle: "코너 3점 클린 슛 허용!", feedbackDesc: "거리가 너무 멀어 슈터가 노마크로 편안하게 3점슛을 성공시켜요." },
          B: { x: 420, y: 160, angle: 110, label: "코너 슈터 앞 잔발 클로즈아웃", isCorrect: true, feedbackTitle: "빛의 속도 로테이션 성공!", feedbackDesc: "연속 패스에 당황하지 않고 쏜살같이 뛰어가 잔발로 멈추며 코너 3점슛을 완벽히 차단했어요!" },
          C: { x: 480, y: 260, angle: 180, label: "사이드라인 밖으로 튕겨나가기", isCorrect: false, feedbackTitle: "돌파 고속도로 개통!", feedbackDesc: "급하게 달려들다 튕겨나가면 슈터가 베이스라인으로 뚫고 들어와요." }
        },
        locationTipTitle: "로테이션(Rotation)의 생명은 스피드",
        locationTipDesc: "빠른 패스 연결이 일어날 때는 한 박자 빠른 판단으로 다음 슈터에게 총알같이 달려가 잔발로 클로즈아웃해야 합니다!",
        voiceScript: "빠른 연속 패스 상황에서는 망설이지 말고 다음 오픈 슈터에게 달려가 잔발로 멈추며 슛을 방해하세요!"
      },
      {
        id: 11,
        title: "3대3 핀다운 스크린(Pin-Down Screen) 슈터 추격",
        shortName: "핀다운 추격",
        situationDesc: "골밑 빅맨(#9)의 다운 스크린을 타고 <strong>외곽 윙으로 빠져나오는 슈터(#8)</strong>를 끈질기게 추격할 위치는?",
        attacker: { x: 300, y: 470, angle: 0, label: "패서 탑 #7" },
        axisTarget: { x: 440, y: 390 },
        otherPlayers: [
          { type: 'att', x: 440, y: 390, angle: -30, number: '8', name: '핀다운 탄 슈터' },
          { type: 'att', x: 340, y: 240, angle: 0, number: '9', name: '다운 스크리너' },
          { type: 'def', x: 300, y: 400, angle: 180, number: '1', name: '탑 수비' },
          { type: 'def', x: 320, y: 190, angle: 160, number: '2', name: '스크린 수비' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 400, y: 330, angle: 140, label: "스크린을 바짝 타고 돌아 슈터 앞 잔발 정지", isCorrect: true, feedbackTitle: "환상적인 핀다운 체이싱!", feedbackDesc: "스크리너의 몸에 걸리지 않고 슈터의 꼬리를 밟듯이 바짝 따라붙어 캐치앤샷을 완벽히 차단했어요!" },
          B: { x: 300, y: 220, angle: 180, label: "골밑에서 멀뚱히 서있기", isCorrect: false, feedbackTitle: "외곽 노마크 3점 허용!", feedbackDesc: "외곽으로 빠진 슈터를 놓치면 100% 오픈 3점슛을 내줘요." },
          C: { x: 340, y: 280, angle: 0, label: "스크리너와 쾅 부딪혀 넘어지기", isCorrect: false, feedbackTitle: "스크린 충돌 & 오픈 슛 허용!", feedbackDesc: "스크린에 정면으로 걸리면 공격수에게 완전히 자유로운 슛 공간을 내줘요." }
        },
        locationTipTitle: "핀다운(Pin-Down) 수비의 꼬리물기",
        locationTipDesc: "다운 스크린을 빠져나가는 슈터는 한 발짝의 틈도 주지 말고 슈터의 허리를 잡듯이 바짝 붙어 돌아나가야 합니다!",
        voiceScript: "핀다운 스크린을 타고 외곽으로 나가는 슈터는 스크리너를 피해 슈터 뒤에 바짝 붙어 쫓아가야 합니다!"
      },
      {
        id: 12,
        title: "3대3 백스크린(Back Screen) 앨리웁 방어",
        shortName: "백스크린 방어",
        situationDesc: "수비수 등 뒤에 걸린 백스크린을 타고 <strong>골밑으로 솟구치는 앨리웁 덩크</strong>를 빅맨인 당신이 막아낼 위치는?",
        attacker: { x: 300, y: 470, angle: 0, label: "탑 로브 패서 #7" },
        axisTarget: { x: 300, y: 150 },
        otherPlayers: [
          { type: 'att', x: 300, y: 180, angle: 0, number: '8', name: '앨리웁 점퍼' },
          { type: 'att', x: 250, y: 320, angle: 40, number: '9', name: '백스크리너' },
          { type: 'def', x: 300, y: 400, angle: 180, number: '1', name: '탑 수비' },
          { type: 'def', x: 230, y: 350, angle: -140, number: '2', name: '스크린 걸린 동료' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 260, y: 320, angle: 180, label: "외곽 스크리너 옆에 딱 붙어있기", isCorrect: false, feedbackTitle: "골밑 백도어 덩크 허용!", feedbackDesc: "외곽에만 머물면 등 뒤로 뛰어든 선수에게 그림 같은 앨리웁 덩크를 헌납해요." },
          B: { x: 300, y: 420, angle: 180, label: "탑의 볼만 보러 올라가기", isCorrect: false, feedbackTitle: "골밑 텅 비어 실점!", feedbackDesc: "골밑을 비워두면 높은 패스 한 방에 바로 실점해요." },
          C: { x: 300, y: 140, angle: 180, label: "골대 바로 앞에서 수직 만세로 림 보호", isCorrect: true, feedbackTitle: "철벽 림 프로텍션 & 인터셉트!", feedbackDesc: "백스크린에 걸린 동료를 대신해 골밑 최후의 보루를 사수하여 공중 패스를 완벽히 쳐냈어요!" }
        },
        locationTipTitle: "백스크린 시 빅맨의 림 프로텍션",
        locationTipDesc: "등 뒤에 스크린이 걸려 동료가 제쳐졌을 때는 빅맨이 즉시 골밑 앞을 선점해 공중 패스를 쳐내야 합니다!",
        voiceScript: "등 뒤 백스크린으로 동료가 뚫렸을 때는 빅맨이 골대 앞 공간을 먼저 선점해 앨리웁 패스를 막아내야 합니다!"
      },
      {
        id: 13,
        title: "3대3 와이드 오픈 코너 롱패스 클로즈아웃",
        shortName: "코너 롱클로즈아웃",
        situationDesc: "왼쪽에서 돌파가 일어나 수비가 몰렸을 때 <strong>오른쪽 코너(#8)로 긴 스킵 패스</strong>가 날아갔어요! 당신의 수비 위치는?",
        attacker: { x: 490, y: 160, angle: -80, label: "코너 오픈 슈터 #8" },
        axisTarget: { x: 490, y: 160 },
        otherPlayers: [
          { type: 'att', x: 180, y: 260, angle: 20, number: '7', name: '패스 뿌린 돌파자' },
          { type: 'att', x: 300, y: 450, angle: 0, number: '9', name: '탑' },
          { type: 'def', x: 210, y: 220, angle: -120, number: '1', name: '골밑 도움 수비' },
          { type: 'def', x: 280, y: 380, angle: 180, number: '2', name: '탑 수비' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 300, y: 180, angle: 180, label: "골밑에서 서성거리기", isCorrect: false, feedbackTitle: "코너 노마크 3점 허용!", feedbackDesc: "거리가 멀다고 안 뛰어가면 상대가 연습하듯 편안하게 코너 3점을 성공시켜요." },
          B: { x: 430, y: 160, angle: 110, label: "전속력 질주 후 팔 하나 거리 잔발 멈춤", isCorrect: true, feedbackTitle: "기적의 롱 클로즈아웃 성공!", feedbackDesc: "공이 날아가는 동안 전속력으로 좁히고 마지막에 잔발로 멈춰 슛과 베이스라인 돌파를 완벽히 막았어요!" },
          C: { x: 500, y: 220, angle: -90, label: "사이드라인 밖으로 날아가기", isCorrect: false, feedbackTitle: "페이크에 낚여 돌파 허용!", feedbackDesc: "브레이크 없이 날아들면 슈터가 슛 페이크 후 베이스라인으로 뚫고 들어가요." }
        },
        locationTipTitle: "스킵 패스(Skip Pass) 클로즈아웃 공식",
        locationTipDesc: "공이 공중에 떠 있는 동안 거리의 80%를 전속력으로 좁히고, 마지막 20%는 잔발을 구르며 브레이크를 잡으세요!",
        voiceScript: "반대편 코너로 긴 패스가 갈 때는 공이 떠 있는 동안 전속력으로 달려가 마지막에 잔발로 멈추어야 합니다!"
      },
      {
        id: 14,
        title: "3대3 하이-로우(High-Low) 패스 인터셉트",
        shortName: "하이-로우 차단",
        situationDesc: "자유투 라인의 공격수(#9)가 <strong>골밑의 장신 센터(#8)에게 바운스 패스</strong>를 찔러주려 해요! 패스 길목을 끊을 위치는?",
        attacker: { x: 300, y: 280, angle: 0, label: "하이포스트 패서 #9" },
        axisTarget: { x: 300, y: 140 },
        otherPlayers: [
          { type: 'att', x: 300, y: 140, angle: 0, number: '8', name: '골밑 센터' },
          { type: 'att', x: 440, y: 400, angle: -30, number: '7', name: '외곽 윙' },
          { type: 'def', x: 300, y: 330, angle: 180, number: '1', name: '하이 수비' },
          { type: 'def', x: 390, y: 330, angle: 150, number: '2', name: '외곽 수비' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 190, angle: 180, label: "하이-로우 사이 패스 길목 앞선 차단", isCorrect: true, feedbackTitle: "환상적인 인터셉트 스틸!", feedbackDesc: "하이포스트와 로우포스트 사이의 좁은 패스 길목을 온몸으로 가로막아 공을 낚아챘어요!" },
          B: { x: 300, y: 90, angle: 180, label: "골대 바로 밑으로 숨기", isCorrect: false, feedbackTitle: "골밑 이지 바스켓 허용!", feedbackDesc: "뒤로 물러서 있으면 상대 센터가 패스를 편안하게 받아 가볍게 득점해요." },
          C: { x: 420, y: 250, angle: 180, label: "사이드 쪽으로 비키기", isCorrect: false, feedbackTitle: "중앙 킬패스 허용!", feedbackDesc: "중앙 길목을 비워두면 치명적인 실점으로 이어져요." }
        },
        locationTipTitle: "하이-로우 패스 차단의 핵심",
        locationTipDesc: "골밑 공격수의 등 뒤에 서 있지 말고, 하이포스트 패서와 골밑 공격수 사이의 길목에 서서 손을 낮게 뻗어 바운스 패스를 막으세요!",
        voiceScript: "자유투 라인에서 골밑으로 들어오는 하이로우 패스는 두 선수 사이 길목을 가로막아 끊어내야 합니다!"
      },
      {
        id: 15,
        title: "3대3 드리블 드라이브 모션 갭(Gap) 수비",
        shortName: "갭 수비",
        situationDesc: "상대 볼핸들러(#7)가 윙과 탑 사이의 <strong>빈 틈(Gap)으로 강력한 돌파</strong>를 시작해요! 틈새를 좁혀 막을 수비 위치는?",
        attacker: { x: 380, y: 430, angle: -20, label: "갭 돌파 시도 #7" },
        axisTarget: { x: 380, y: 430 },
        otherPlayers: [
          { type: 'att', x: 180, y: 400, angle: 30, number: '8', name: '반대편 윙' },
          { type: 'att', x: 480, y: 220, angle: -80, number: '9', name: '코너 슈터' },
          { type: 'def', x: 340, y: 440, angle: 170, number: '1', name: '돌파당한 동료' },
          { type: 'def', x: 440, y: 260, angle: 120, number: '2', name: '코너 수비' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 180, y: 410, angle: -150, label: "반대편 윙에만 꼭 달라붙어있기", isCorrect: false, feedbackTitle: "중앙 돌파 덩크 허용!", feedbackDesc: "도움을 주지 않고 외곽에 붙어 있으면 돌파자가 유유히 레이업을 올려요." },
          B: { x: 300, y: 150, angle: 180, label: "골밑으로 쑥 물러서기", isCorrect: false, feedbackTitle: "점프슛 헌납!", feedbackDesc: "너무 물러서면 상대가 미들 점퍼를 던져요." },
          C: { x: 310, y: 350, angle: 150, label: "돌파 틈새(갭)로 한 걸음 좁혀 벽 세우기", isCorrect: true, feedbackTitle: "완벽한 갭 디펜스! 돌파 봉쇄!", feedbackDesc: "수비수 사이의 틈새로 파고드는 진로를 한 걸음 좁혀 몸으로 막아서며 턴오버를 유도했어요!" }
        },
        locationTipTitle: "갭(Gap)을 좁히는 협력 수비",
        locationTipDesc: "상대가 수비수 사이 틈을 노릴 때는 반대편 수비수가 1m 안쪽으로 좁혀서 '벽(Wall)'을 만들어야 돌파를 막을 수 있습니다!",
        voiceScript: "수비수 사이 틈새로 파고드는 공격은 안쪽으로 한 걸음 좁혀 벽을 세우며 돌파를 가로막으세요!"
      },
      {
        id: 16,
        title: "3대3 업스크린(Up Screen) 탑 슛 차단",
        shortName: "업스크린 대처",
        situationDesc: "골밑에 있던 공격수(#9)가 올라오며 업스크린을 걸어 <strong>탑의 가드(#8)가 3점슛</strong>을 노려요! 스크린을 넘을 위치는?",
        attacker: { x: 300, y: 470, angle: 0, label: "탑 슈터 #8" },
        axisTarget: { x: 300, y: 470 },
        otherPlayers: [
          { type: 'att', x: 300, y: 380, angle: 180, number: '9', name: '업스크리너' },
          { type: 'att', x: 440, y: 380, angle: -30, number: '7', name: '패서 윙' },
          { type: 'def', x: 300, y: 330, angle: 0, number: '1', name: '스크린 수비' },
          { type: 'def', x: 390, y: 340, angle: 140, number: '2', name: '윙 수비' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 300, y: 250, angle: 180, label: "골밑으로 도망가기", isCorrect: false, feedbackTitle: "탑 오픈 3점 폭격!", feedbackDesc: "업스크린에 걸려 골밑으로 빠지면 탑에서 편안하게 3점슛을 성공시켜요." },
          B: { x: 300, y: 410, angle: 180, label: "스크리너 위쪽으로 뚫고 나가 슛 견제", isCorrect: true, feedbackTitle: "업스크린 완벽 극복!", feedbackDesc: "골밑에서 올라오는 스크리너의 몸을 영리하게 피하고 위쪽으로 빠져나가 3점슛을 완벽히 차단했어요!" },
          C: { x: 220, y: 380, angle: 90, label: "옆으로 튕겨나가기", isCorrect: false, feedbackTitle: "수비 균열 발생!", feedbackDesc: "옆으로 밀려나면 공격자에게 완벽한 오픈 찬스를 줘요." }
        },
        locationTipTitle: "업스크린(Up Screen) 대처법",
        locationTipDesc: "골밑에서 올라오는 스크린을 상대할 때는 스크리너와 공격수 사이 틈을 빠르게 파고들어 슛 공간을 지워야 합니다!",
        voiceScript: "밑에서 올라오는 업스크린에는 스크리너 위쪽으로 신속히 빠져나가 탑의 슛을 가로막으세요!"
      },
      {
        id: 17,
        title: "3대3 2차 리바운드(Offensive Rebound) 풋백 차단",
        shortName: "풋백 차단",
        situationDesc: "슛이 림 맞고 튀었어요! 상대 빅맨(#9)이 <strong>골밑으로 쇄도해 풋백 덩크</strong>를 노려요! 이를 막을 박스아웃 위치는?",
        attacker: { x: 300, y: 130, angle: 0, label: "풋백 노리는 빅맨 #9" },
        axisTarget: { x: 300, y: 90 },
        otherPlayers: [
          { type: 'att', x: 440, y: 400, angle: -30, number: '7', name: '슛 던진 가드' },
          { type: 'att', x: 160, y: 390, angle: 30, number: '8', name: '외곽 슈터' },
          { type: 'def', x: 390, y: 350, angle: 140, number: '1', name: '외곽 수비' },
          { type: 'def', x: 200, y: 340, angle: -140, number: '2', name: '외곽 수비' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 155, angle: 180, label: "상대 빅맨을 등으로 밀어내며 림 앞 공간 선점", isCorrect: true, feedbackTitle: "천하무적 박스아웃 & 리바운드!", feedbackDesc: "달려드는 빅맨을 등으로 완벽히 가로막아 골밑 접근을 원천 차단하고 수비 리바운드를 안전하게 확보했어요!" },
          B: { x: 300, y: 80, angle: 0, label: "골대 밑에 들어가 공만 쳐다보기", isCorrect: false, feedbackTitle: "뒤에서 덮쳐 풋백 덩크 허용!", feedbackDesc: "공만 보고 있으면 뒤에서 달려드는 빅맨에게 인유어페이스 풋백을 얻어맞아요." },
          C: { x: 420, y: 220, angle: 180, label: "사이드로 피하기", isCorrect: false, feedbackTitle: "골밑 리바운드 헌납!", feedbackDesc: "골밑 자리를 비워두면 쉬운 세컨 찬스 득점을 허용해요." }
        },
        locationTipTitle: "풋백(Put-Back)을 막는 등의 힘",
        locationTipDesc: "리바운드는 키로 잡는 것이 아니라 등으로 잡는 것입니다! 상대 가슴을 내 등과 엉덩이로 먼저 가두세요!",
        voiceScript: "쇄도하는 상대 공격수는 등으로 먼저 가로막는 박스아웃을 펼쳐 골밑 접근을 원천 차단해야 합니다!"
      },
      {
        id: 18,
        title: "3대3 탑-윙 스위치 후 로우포스트 헬프",
        shortName: "스위치 후 로우헬프",
        situationDesc: "외곽 스위치 후 상대 빅맨(#9)이 <strong>골밑에서 1대1 미스매치 득점</strong>을 노려요! 반대편 윙 수비수인 당신의 도움 위치는?",
        attacker: { x: 250, y: 160, angle: 80, label: "골밑 미스매치 빅맨 #9" },
        axisTarget: { x: 250, y: 160 },
        otherPlayers: [
          { type: 'att', x: 440, y: 400, angle: -30, number: '7', name: '탑 가드' },
          { type: 'att', x: 460, y: 200, angle: -80, number: '8', name: '내 마크맨 (코너)' },
          { type: 'def', x: 260, y: 190, angle: 180, number: '1', name: '버티는 작은 동료' },
          { type: 'def', x: 390, y: 350, angle: 140, number: '2', name: '탑 수비' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 460, y: 210, angle: -100, label: "코너의 내 마크맨에게 꼭 붙어있기", isCorrect: false, feedbackTitle: "골밑 쉬운 득점 허용!", feedbackDesc: "골밑 미스매치를 방치하면 상대 빅맨이 가볍게 골밑 득점을 올려요." },
          B: { x: 200, y: 140, angle: 0, label: "상대 빅맨에게 무작정 달려들어 파울하기", isCorrect: false, feedbackTitle: "코너 3점슛 오픈 헌납!", feedbackDesc: "완전히 달라붙으면 코너의 내 마크맨에게 킥아웃 패스가 나가 3점을 맞아요." },
          C: { x: 330, y: 180, angle: 130, label: "페인트존 중앙으로 좁혀 헬프 & 코너 견제", isCorrect: true, feedbackTitle: "지혜로운 싱크(Sink) & 헬프 성공!", feedbackDesc: "페인트존 중앙까지 깊게 좁혀 들어와 빅맨의 골밑 슛을 방해하면서 코너 패스도 인터셉트할 수 있는 최고의 위치예요!" }
        },
        locationTipTitle: "미스매치 발생 시 싱크(Sink) 수비",
        locationTipDesc: "동료가 골밑 미스매치로 위기에 처했을 때는 반대편 수비수가 페인트존으로 좁혀 내려와(Sink) 골밑을 보호해야 합니다!",
        voiceScript: "골밑 미스매치 상황에서는 반대편 수비수가 페인트존 중앙으로 좁혀 들어와 골밑 슛을 함께 막아주어야 합니다!"
      },
      {
        id: 19,
        title: "3대3 픽앤팝 탑 3점슛 블록 타이밍",
        shortName: "픽앤팝 블록",
        situationDesc: "탑으로 빠진 스크리너(#9)가 공을 잡고 <strong>3점슛을 막 쏘아 올리려는 찰나</strong>입니다! 가장 이상적인 수비 위치는?",
        attacker: { x: 300, y: 460, angle: 0, label: "3점 쏘는 팝아웃 #9" },
        axisTarget: { x: 300, y: 460 },
        otherPlayers: [
          { type: 'att', x: 220, y: 390, angle: 20, number: '7', name: '패스 준 가드' },
          { type: 'att', x: 440, y: 380, angle: -30, number: '8', name: '우측 윙' },
          { type: 'def', x: 240, y: 340, angle: -140, number: '1', name: '가드 수비' },
          { type: 'def', x: 380, y: 320, angle: 140, number: '2', name: '윙 수비' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 300, y: 460, angle: 180, label: "슈터의 몸에 부딪히며 점프하기", isCorrect: false, feedbackTitle: "3점슛 파울 & 자유투 3개!", feedbackDesc: "슈터에게 몸을 부딪히면 3점슛 파울이 불려 치명적인 실점을 내줘요." },
          B: { x: 300, y: 380, angle: 180, label: "팔 하나 거리에서 수직으로 하이핸드 뻗기", isCorrect: true, feedbackTitle: "에어볼 유도! 완벽한 슛 콘테스트!", feedbackDesc: "파울을 범하지 않고 팔 하나 거리에서 손을 수직으로 번쩍 뻗어 슈터의 림 시야를 완벽히 가려 에어볼을 유도했어요!" },
          C: { x: 300, y: 220, angle: 180, label: "골밑으로 물러서서 구경하기", isCorrect: false, feedbackTitle: "클린 3점슛 실점!", feedbackDesc: "너무 멀리 떨어지면 상대가 편안하게 3점슛을 성공시켜요." }
        },
        locationTipTitle: "3점슛 콘테스트의 철칙",
        locationTipDesc: "블록을 욕심내어 앞으로 뛰지 말고, 팔 하나 거리에서 위로 손을 수직으로 뻗어야 파울 없이 슛 성공률을 급격히 떨어뜨릴 수 있습니다!",
        voiceScript: "3점슛을 막을 때는 앞으로 덤비지 말고 팔 하나 거리에서 손만 수직으로 높이 들어 시야를 가려주세요!"
      },
      {
        id: 20,
        title: "3대3 매치포인트(Match Point) 최종 챔피언십 결사 수비",
        shortName: "매치포인트 승리",
        situationDesc: "1점만 주면 끝나는 매치포인트! 상대 에이스(#7)가 <strong>마지막 승부 돌파</strong>를 감행해요! 우승을 확정지을 최종 위치는?",
        attacker: { x: 300, y: 440, angle: 0, label: "마지막 돌파 에이스 #7" },
        axisTarget: { x: 300, y: 440 },
        otherPlayers: [
          { type: 'att', x: 440, y: 400, angle: -30, number: '8', name: '우측 윙' },
          { type: 'att', x: 160, y: 400, angle: 30, number: '9', name: '좌측 윙' },
          { type: 'def', x: 380, y: 340, angle: 140, number: '1', name: '우측 디나이' },
          { type: 'def', x: 220, y: 340, angle: -140, number: '2', name: '좌측 디나이' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 340, angle: 180, label: "골대와 일직선 축선에서 낮은 기마자세 버티기", isCorrect: true, feedbackTitle: "버저비터 차단! 3대3 챔피언 등극!", feedbackDesc: "가장 안전하고 완벽한 수비 위치에서 상대 돌파를 온몸으로 막아내어 우승 트로피를 들어올렸어요!" },
          B: { x: 300, y: 430, angle: 180, label: "공을 뺏으려고 무리하게 후려치기", isCorrect: false, feedbackTitle: "파울 휘슬 & 끝내기 자유투 패배!", feedbackDesc: "매치포인트에서 손을 휘두르면 파울로 허무하게 패배하고 말아요." },
          C: { x: 300, y: 150, angle: 180, label: "골밑으로 뒷걸음질치기", isCorrect: false, feedbackTitle: "점프 점퍼 허용 & 패배!", feedbackDesc: "너무 물러서면 상대 에이스가 여유롭게 위닝 점퍼를 터뜨려요." }
        },
        locationTipTitle: "매치포인트 수비의 절대 원칙",
        locationTipDesc: "스틸 욕심을 버리고, 두 발을 넓게 벌려 골대와 상대 사이의 정중앙을 가슴으로 단단히 막아서는 것이 챔피언의 기본기입니다!",
        voiceScript: "마지막 승부처에서는 스틸을 노리지 말고, 두 발을 넓게 벌려 골대 앞을 몸으로 당당히 막아서세요!"
      }
    ],

    // ---------------- 5대5 정규전 모드 (20문제) ----------------
    '5v5': [
      {
        id: 1,
        title: "5대5 맨투맨 I-Line (아이 라인) 커버",
        shortName: "I-Line 커버",
        situationDesc: "공이 오른쪽 윙에 있어요! 당신은 <strong>반대편 왼쪽 코너 공격수(#11)</strong>를 맡은 수비수입니다. 올바른 위치는?",
        attacker: { x: 480, y: 360, angle: -40, label: "윙 공 소유 (#7)" },
        axisTarget: { x: 300, y: 220 },
        otherPlayers: [
          { type: 'att', x: 300, y: 470, angle: 0, number: '1', name: '포인트가드' },
          { type: 'att', x: 520, y: 160, angle: -80, number: '9', name: '우측 코너' },
          { type: 'att', x: 380, y: 180, angle: -40, number: '10', name: '우측 센터' },
          { type: 'att', x: 80, y: 160, angle: 80, number: '11', name: '내 마크맨' },
          { type: 'def', x: 420, y: 300, angle: 140, number: '2', name: '윙 수비' },
          { type: 'def', x: 300, y: 400, angle: 180, number: '3', name: '가드 수비' },
          { type: 'def', x: 460, y: 140, angle: 100, number: '4', name: '코너 수비' },
          { type: 'def', x: 350, y: 140, angle: 140, number: '5', name: '센터 수비' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 260, y: 180, angle: 120, label: "중앙선(I-Line)까지 좁혀 페인트존 수호", isCorrect: true, feedbackTitle: "정규전 수비의 정석! I-Line 완벽!", feedbackDesc: "가상의 중앙선(I-Line)까지 들어와 림 프로텍션을 서포트하고 반대편 롱패스도 대비했어요!" },
          B: { x: 90, y: 160, angle: -100, label: "반대편 코너에 꼭 붙어있기", isCorrect: false, feedbackTitle: "골밑 수비 지원 부족!", feedbackDesc: "5대5에서는 공 반대편 수비수가 중앙까지 좁혀줘야 골밑이 뚫리지 않아요." },
          C: { x: 440, y: 340, angle: 180, label: "오른쪽 공 쪽으로 다 몰려가기", isCorrect: false, feedbackTitle: "반대편 전체가 무방비!", feedbackDesc: "한쪽으로 다 쏠리면 스킵 패스 한 번에 완전 노마크가 돼요." }
        },
        locationTipTitle: "5대5 I-Line (아이 라인) 수비",
        locationTipDesc: "골대와 백보드를 잇는 코트 중앙 일직선을 I-Line이라고 해요. 공 반대편 수비수들은 이 라인까지 들어와 벽을 만들어야 합니다!",
        voiceScript: "5대5 정규 경기에서는 공 반대편 수비수가 코트 중앙 가상의 아이 라인까지 좁혀 페인트존을 지켜야 합니다!"
      },
      {
        id: 2,
        title: "5대5 2-3 지역방어 앞선 가드 위치",
        shortName: "2-3 앞선 수비",
        situationDesc: "우리 팀이 2-3 지역방어(Zone)를 펼칩니다! <strong>앞선 왼쪽 가드인 당신의 기본 위치는?</strong>",
        attacker: { x: 300, y: 470, angle: 0, label: "상대 리딩 가드 (#1)" },
        axisTarget: { x: 240, y: 380 },
        otherPlayers: [
          { type: 'att', x: 460, y: 380, angle: -30, number: '7', name: '우측 윙' },
          { type: 'att', x: 140, y: 380, angle: 30, number: '9', name: '좌측 윙' },
          { type: 'att', x: 360, y: 220, angle: 0, number: '10', name: '센터' },
          { type: 'att', x: 500, y: 150, angle: -80, number: '11', name: '우측 코너' },
          { type: 'def', x: 350, y: 380, angle: 180, number: '2', name: '앞선 오른쪽 가드' },
          { type: 'def', x: 180, y: 220, angle: 150, number: '3', name: '뒷선 왼쪽 포워드' },
          { type: 'def', x: 300, y: 160, angle: 180, number: '5', name: '뒷선 중앙 센터' },
          { type: 'def', x: 420, y: 220, angle: -150, number: '4', name: '뒷선 오른쪽 포워드' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 300, y: 460, angle: 180, label: "혼자 무리하게 스틸하러 돌진", isCorrect: false, feedbackTitle: "지역방어 대열 붕괴!", feedbackDesc: "앞선 가드가 혼자 뛰어나가면 중앙 하이포스트가 뻥 뚫려요." },
          B: { x: 250, y: 370, angle: 170, label: "3점 라인 앞선에서 좌측 윙 견제", isCorrect: true, feedbackTitle: "완벽한 2-3 존 앞선 위치!", feedbackDesc: "동료 가드와 나란히 서서 중앙 침투를 막고 왼쪽 패스를 압박하는 정석 위치예요!" },
          C: { x: 200, y: 120, angle: 180, label: "골밑까지 내려가 버티기", isCorrect: false, feedbackTitle: "앞선 외곽 3점슛 대폭발!", feedbackDesc: "가드가 골밑까지 처지면 외곽에서 편하게 3점슛을 퍼부어요." }
        },
        locationTipTitle: "2-3 지역방어 앞선의 역할",
        locationTipDesc: "2-3 존의 앞선 가드 2명은 하이포스트로 들어가는 패스를 막고, 공이 윙으로 갈 때 빠르게 달려나가 3점슛을 체크해야 해요!",
        voiceScript: "2-3 지역방어에서 앞선 가드는 중앙 하이포스트 패스를 차단하고 외곽을 견제하는 역할을 맡습니다!"
      },
      {
        id: 3,
        title: "5대5 2-3 지역방어 코너 슛 커버 (뒷선 윙)",
        shortName: "코너 로테이션",
        situationDesc: "상대가 왼쪽 코너(#9)로 빠른 패스를 보냈어요! <strong>2-3 존의 뒷선 왼쪽 수비수인 당신은?</strong>",
        attacker: { x: 80, y: 160, angle: 80, label: "코너 공 소유 (#9)" },
        axisTarget: { x: 140, y: 150 },
        otherPlayers: [
          { type: 'att', x: 150, y: 380, angle: 30, number: '7', name: '좌측 윙' },
          { type: 'att', x: 300, y: 460, angle: 0, number: '1', name: '가드' },
          { type: 'att', x: 320, y: 180, angle: 0, number: '10', name: '센터' },
          { type: 'att', x: 460, y: 380, angle: -30, number: '11', name: '우측 윙' },
          { type: 'def', x: 220, y: 360, angle: 160, number: '2', name: '앞선 가드 1' },
          { type: 'def', x: 340, y: 360, angle: 180, number: '3', name: '앞선 가드 2' },
          { type: 'def', x: 260, y: 160, angle: 150, number: '5', name: '센터' },
          { type: 'def', x: 400, y: 220, angle: -150, number: '4', name: '뒷선 우측' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 200, y: 220, angle: 180, label: "가만히 서서 지켜보기", isCorrect: false, feedbackTitle: "노마크 코너 3점슛 실점!", feedbackDesc: "코너는 가장 가까운 뒷선 윙 수비수가 총알같이 튀어나가야 해요." },
          B: { x: 70, y: 150, angle: -100, label: "선 밖으로 날아가 몸통 박치기", isCorrect: false, feedbackTitle: "파울 & 베이스라인 오픈!", feedbackDesc: "너무 급하게 달려들면 펌프 페이크에 속아 쉽게 뚫려요." },
          C: { x: 140, y: 140, angle: -100, label: "코너로 튀어나가 베이스라인 차단", isCorrect: true, feedbackTitle: "환상적인 2-3 존 코너 커버!", feedbackDesc: "재빠르게 코너로 달려나가 3점슛을 체크하고 골밑 베이스라인 돌파를 봉쇄했어요!" }
        },
        locationTipTitle: "2-3 존의 코너 로테이션",
        locationTipDesc: "코너로 공이 가면 뒷선 윙이 재빠르게 뛰어나가고, 중앙 센터가 골밑을 채워주는 유기적인 로테이션이 핵심이에요!",
        voiceScript: "코너로 공이 갔을 때는 뒷선 윙 수비수가 빠르게 달려나가 슛과 베이스라인 돌파를 모두 차단해야 합니다!"
      },
      {
        id: 4,
        title: "5대5 하이-로우 패스 차단 (포스트 프런트 수비)",
        shortName: "포스트 프런트",
        situationDesc: "자유투 라인(#1)에서 골밑 장신 센터(#10)에게 패스하려 해요! <strong>센터를 막는 당신의 수비 위치는?</strong>",
        attacker: { x: 300, y: 280, angle: 0, label: "자유투 공 소유 (#1)" },
        axisTarget: { x: 300, y: 180 },
        otherPlayers: [
          { type: 'att', x: 300, y: 170, angle: 0, number: '10', name: '골밑 장신 센터' },
          { type: 'att', x: 460, y: 380, angle: -30, number: '7', name: '외곽 7' },
          { type: 'att', x: 140, y: 380, angle: 30, number: '9', name: '외곽 9' },
          { type: 'att', x: 500, y: 160, angle: -80, number: '11', name: '코너 11' },
          { type: 'def', x: 300, y: 330, angle: 180, number: '2', name: '자유투 수비' },
          { type: 'def', x: 400, y: 300, angle: 150, number: '3', name: '외곽 수비' },
          { type: 'def', x: 200, y: 300, angle: -150, number: '4', name: '외곽 수비' },
          { type: 'def', x: 440, y: 150, angle: 100, number: '5', name: '코너 수비' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 210, angle: 180, label: "공격수 앞(프런트)을 가로막아 패스 차단", isCorrect: true, feedbackTitle: "환상적인 프런트 디펜스(Front)!", feedbackDesc: "센터의 앞길을 몸과 팔로 완전히 가로막아 골밑 패스 자체를 원천 봉쇄했어요!" },
          B: { x: 300, y: 120, angle: 180, label: "공격수 등 뒤에 숨어있기", isCorrect: false, feedbackTitle: "쉬운 골밑 패스 & 덩크 허용!", feedbackDesc: "키 큰 센터의 등 뒤에 서 있으면 머리 위로 넘어오는 패스를 절대 못 막아요." },
          C: { x: 220, y: 180, angle: 140, label: "옆으로 멀리 비켜서기", isCorrect: false, feedbackTitle: "골대 중앙이 텅 비었어요!", feedbackDesc: "센터에게 가장 넓은 골밑 공간을 공짜로 내주게 돼요." }
        },
        locationTipTitle: "골밑 프런트 디펜스(Fronting)",
        locationTipDesc: "골밑 공격수가 나보다 키가 크다면 등 뒤에서 버티지 말고, 아예 공격수의 앞을 가로막아 패스가 못 들어오게 만드는 것이 최고 비법이에요!",
        voiceScript: "키 큰 센터를 막을 때는 등 뒤에 서지 말고 공격수 앞을 가로막아 패스 자체를 차단하는 프런트 수비가 정답입니다!"
      },
      {
        id: 5,
        title: "5대5 속공 2대1 수적 열세 수비 (Tandem)",
        shortName: "2대1 속공 수비",
        situationDesc: "상대 공격수 2명이 폭풍처럼 달려오고, <strong>수비수는 오직 당신 혼자 골밑에 남았습니다! 당신의 위치는?</strong>",
        attacker: { x: 240, y: 460, angle: 0, label: "드리블 질주 (#7)" },
        axisTarget: { x: 300, y: 200 },
        otherPlayers: [
          { type: 'att', x: 380, y: 440, angle: 0, number: '9', name: '패스 대기 질주' },
          { type: 'att', x: 200, y: 640, angle: 0, number: '1', name: '뒤따라오는 공격' },
          { type: 'att', x: 420, y: 640, angle: 0, number: '10', name: '뒤따라오는 공격' },
          { type: 'att', x: 500, y: 600, angle: 0, number: '11', name: '뒤따라오는 공격' },
          { type: 'def', x: 220, y: 580, angle: 0, number: '2', name: '헐레벌떡 백코트' },
          { type: 'def', x: 350, y: 590, angle: 0, number: '3', name: '헐레벌떡 백코트' },
          { type: 'def', x: 180, y: 660, angle: 0, number: '4', name: '백코트 중' },
          { type: 'def', x: 420, y: 660, angle: 0, number: '5', name: '백코트 중' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 240, y: 440, angle: 180, label: "공 가진 7번에게 성급히 달려들기", isCorrect: false, feedbackTitle: "옆으로 툭 패스해서 노마크 득점!", feedbackDesc: "무리하게 덤비면 옆으로 툭 패스해서 100% 손쉬운 득점을 내줘요." },
          B: { x: 300, y: 220, angle: 180, label: "페인트존 중앙에서 시간을 벌며 페이크", isCorrect: true, feedbackTitle: "영웅적인 2대1 수비 성공!", feedbackDesc: "골밑 중앙을 지키며 슛과 패스 모두를 망설이게 만들어, 우리 팀 동료들이 돌아올 귀중한 3초를 벌었어요!" },
          C: { x: 150, y: 200, angle: 180, label: "사이드라인으로 도망가기", isCorrect: false, feedbackTitle: "골대 중앙 고속도로 개통!", feedbackDesc: "가장 소중한 골대 중앙을 비우면 안 돼요." }
        },
        locationTipTitle: "수적 열세(2대1) 속공 수비 비법",
        locationTipDesc: "절대 먼저 달려들지 마세요! 페인트존 중앙에서 뒷걸음질 치며 슛인 척하면 블록 준비, 패스하면 바로 가로채겠다는 페이크로 시간을 버세요!",
        voiceScript: "혼자서 2명을 막아야 할 때는 덤비지 말고 골밑 중앙에서 상대가 슛할지 패스할지 망설이게 시간을 버는 것이 정답입니다!"
      },
      {
        id: 6,
        title: "5대5 픽앤롤(Pick & Roll) 스위치 디펜스",
        shortName: "스크린 스위치",
        situationDesc: "상대 드리블러가 스크린을 타고 우측으로 돌파하려 해요! 동료 가드가 스크린에 걸렸습니다. <strong>스크리너를 막고 있던 당신의 스위치(Switch) 위치는?</strong>",
        attacker: { x: 300, y: 460, angle: 0, label: "공 가진 상대 가드" },
        axisTarget: { x: 370, y: 390 },
        otherPlayers: [
          { type: 'att', x: 340, y: 440, angle: -90, number: '10', name: '스크린 빅맨' },
          { type: 'att', x: 470, y: 380, angle: -30, number: '7', name: '우측 윙' },
          { type: 'att', x: 140, y: 380, angle: 30, number: '9', name: '좌측 윙' },
          { type: 'att', x: 500, y: 150, angle: -80, number: '11', name: '우측 코너' },
          { type: 'def', x: 310, y: 450, angle: 180, number: '2', name: '스크린 걸린 동료' },
          { type: 'def', x: 420, y: 340, angle: 150, number: '3', name: '우측 윙 수비' },
          { type: 'def', x: 200, y: 320, angle: -150, number: '4', name: '좌측 윙 수비' },
          { type: 'def', x: 300, y: 170, angle: 180, number: '5', name: '골밑 센터' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 300, y: 220, angle: 180, label: "골밑으로 뒷걸음질 치기", isCorrect: false, feedbackTitle: "노마크 점퍼 허용!", feedbackDesc: "가드가 스크린을 빠져나와 여유롭게 미들슛을 쏴버려요." },
          B: { x: 350, y: 460, angle: 0, label: "내 원래 마크맨 뒤에만 서있기", isCorrect: false, feedbackTitle: "드리블러 골밑 고속도로 돌파!", feedbackDesc: "동료가 걸렸을 때는 스위치해서 드리블러 앞을 먼저 차단해야 해요." },
          C: { x: 360, y: 390, angle: 150, label: "지체 없이 스위치하여 돌파 길목 차단", isCorrect: true, feedbackTitle: "완벽한 스위치 디펜스 성공!", feedbackDesc: "스위치 콜과 함께 드리블러의 돌파 진로 앞을 가슴으로 당당히 가로막았어요!" }
        },
        locationTipTitle: "픽앤롤 스위치(Switch) 요령",
        locationTipDesc: "스크린에 동료가 걸렸을 때는 큰 소리로 '스위치!'를 외치고, 스크리너 수비수가 지체 없이 드리블러의 앞길(팔 하나 거리)을 몸으로 막아야 해요!",
        voiceScript: "스크린에 걸렸을 때는 즉시 스위치를 외치며 드리블러의 앞길을 몸으로 막아서는 스위치 수비가 정답입니다!"
      },
      {
        id: 7,
        title: "5대5 트랜지션 백코트 & 림 프로텍션 (Safety)",
        shortName: "트랜지션 백코트",
        situationDesc: "우리 슛이 빗나가고 상대가 리바운드를 잡아 롱패스를 노려요! 상대 선봉이 골밑으로 질주 중입니다. <strong>가장 먼저 백코트하는 안전망(Safety)인 당신의 위치는?</strong>",
        attacker: { x: 260, y: 560, angle: 0, label: "리바운드 가드" },
        axisTarget: { x: 300, y: 170 },
        otherPlayers: [
          { type: 'att', x: 350, y: 310, angle: 0, number: '7', name: '속공 질주 선봉' },
          { type: 'att', x: 470, y: 440, angle: 0, number: '9', name: '우측 윙 질주' },
          { type: 'att', x: 150, y: 580, angle: 0, number: '1', name: '뒤따르는 공격' },
          { type: 'att', x: 380, y: 620, angle: 0, number: '10', name: '공격 빅맨' },
          { type: 'def', x: 230, y: 460, angle: 0, number: '2', name: '백코트 중인 동료' },
          { type: 'def', x: 160, y: 580, angle: 0, number: '3', name: '백코트 중인 동료' },
          { type: 'def', x: 330, y: 620, angle: 0, number: '4', name: '리바운드 후 복귀' },
          { type: 'def', x: 440, y: 580, angle: 0, number: '5', name: '리바운드 후 복귀' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 260, y: 500, angle: 180, label: "하프라인에서 공 뺏으러 덤비기", isCorrect: false, feedbackTitle: "롱패스 한 방에 원샷 레이업 허용!", feedbackDesc: "무리하게 덤비면 머리 위로 롱패스가 넘어가 쉬운 실점을 해요." },
          B: { x: 300, y: 180, angle: 180, label: "골대 밑으로 먼저 뛰어가 상대 선봉 앞길 차단", isCorrect: true, feedbackTitle: "골밑을 구한 명품 백코트!", feedbackDesc: "공보다 먼저 우리 골대 밑(페인트존)을 지켜 상대 속공 득점을 완벽하게 무산시켰어요!" },
          C: { x: 460, y: 300, angle: 180, label: "외곽 사이드라인으로 피하기", isCorrect: false, feedbackTitle: "중앙 림 진로가 텅 비었어요!", feedbackDesc: "트랜지션 수비의 제1원칙은 사이드가 아니라 '골대 앞 페인트존 사수'예요." }
        },
        locationTipTitle: "트랜지션 수비 제1원칙: 골대 먼저 수호!",
        locationTipDesc: "백코트할 때는 절대 공을 쫓아가지 말고, 상대 질주자보다 먼저 '우리 골대 밑'으로 달려가 림 앞 벽을 세워야 합니다!",
        voiceScript: "역습을 당할 때는 공을 쫓지 말고 우리 골대 밑으로 먼저 전속력 백코트하여 골밑 길목을 지키세요!"
      },
      {
        id: 8,
        title: "5대5 헬프 앤드 리커버 (도움 수비 후 제자리 복귀)",
        shortName: "헬프 & 리커버",
        situationDesc: "우측 윙에서 동료가 살짝 제쳐져 당신이 골밑을 1초간 막아섰어요! <strong>상대가 코너로 킥아웃 패스를 빼는 순간 당신의 복귀 위치는?</strong>",
        attacker: { x: 430, y: 380, angle: -30, label: "킥아웃 패서" },
        axisTarget: { x: 470, y: 190 },
        otherPlayers: [
          { type: 'att', x: 490, y: 160, angle: -80, number: '11', name: '오픈 코너 슈터' },
          { type: 'att', x: 300, y: 470, angle: 0, number: '1', name: '탑 가드' },
          { type: 'att', x: 140, y: 380, angle: 30, number: '9', name: '좌측 윙' },
          { type: 'att', x: 200, y: 220, angle: 80, number: '10', name: '골밑 센터' },
          { type: 'def', x: 410, y: 360, angle: 150, number: '2', name: '따라붙는 동료' },
          { type: 'def', x: 300, y: 390, angle: 180, number: '3', name: '탑 수비' },
          { type: 'def', x: 220, y: 320, angle: -150, number: '4', name: '반대편 수비' },
          { type: 'def', x: 280, y: 190, angle: 180, number: '5', name: '골밑 수호 센터' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 440, y: 180, angle: 100, label: "내 마크맨인 코너 슈터에게 잔발로 전력 복귀", isCorrect: true, feedbackTitle: "교과서적인 헬프 & 리커버!", feedbackDesc: "골밑 돌파를 멈추게 한 뒤, 즉시 외곽 코너 슈터에게 달려나가 3점슛까지 차단했어요!" },
          B: { x: 410, y: 360, angle: 150, label: "공 던진 사람에게 계속 붙어있기", isCorrect: false, feedbackTitle: "코너 노마크 3점슛 실점!", feedbackDesc: "패스가 나갔는데도 매달려 있으면 내 마크맨이 완벽한 오픈 찬스를 맞아요." },
          C: { x: 300, y: 120, angle: 180, label: "골대 뒤로 도망치기", isCorrect: false, feedbackTitle: "슈터 방해 실패!", feedbackDesc: "외곽 슈터를 향해 손을 뻗으며 전속력으로 튀어나가야 해요." }
        },
        locationTipTitle: "헬프 & 리커버(Help & Recover) 타이밍",
        locationTipDesc: "도움 수비는 길어야 1초! 상대 돌파가 멈추고 공이 나가는 순간, 지체 없이 내 마크맨을 향해 전력 질주하며 한 손을 번쩍 들어야 해요!",
        voiceScript: "도움 수비로 돌파를 멈춘 뒤에는 1초도 지체하지 말고 외곽의 내 마크맨에게 전력 질주해 슛을 막아내세요!"
      },
      {
        id: 9,
        title: "5대5 슛 직후 박스아웃 & 수비 리바운드",
        shortName: "박스아웃 리바운드",
        situationDesc: "상대 가드가 3점슛을 던져 공이 골대로 날아가요! 바로 뒤에 상대 장신 선수가 쇄도 중입니다. <strong>리바운드를 사수할 당신의 첫 발자국 위치는?</strong>",
        attacker: { x: 300, y: 470, angle: 0, label: "3점슛 시도 가드" },
        axisTarget: { x: 370, y: 220 },
        otherPlayers: [
          { type: 'att', x: 380, y: 240, angle: 0, number: '10', name: '골밑 쇄도 공격수' },
          { type: 'att', x: 220, y: 220, angle: 0, number: '11', name: '골밑 쇄도 센터' },
          { type: 'att', x: 460, y: 380, angle: -30, number: '7', name: '우측 윙' },
          { type: 'att', x: 140, y: 380, angle: 30, number: '9', name: '좌측 윙' },
          { type: 'def', x: 300, y: 400, angle: 180, number: '1', name: '탑 가드' },
          { type: 'def', x: 230, y: 170, angle: 180, number: '5', name: '반대편 박스아웃' },
          { type: 'def', x: 400, y: 330, angle: 150, number: '3', name: '우측 윙 수비' },
          { type: 'def', x: 200, y: 330, angle: -150, number: '4', name: '좌측 윙 수비' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 300, y: 100, angle: 0, label: "골대 바로 밑으로 들어가 림만 쳐다보기", isCorrect: false, feedbackTitle: "뒤에서 덮쳐 풋백 덩크 허용!", feedbackDesc: "공만 쳐다보면 뒤에서 뛰어드는 공격수를 전혀 제어할 수 없어요." },
          B: { x: 440, y: 240, angle: 180, label: "몸싸움 피해서 옆으로 빠지기", isCorrect: false, feedbackTitle: "공격 리바운드 헌납!", feedbackDesc: "골밑 앞길을 비워주면 상대가 편안하게 세컨 찬스 득점을 올려요." },
          C: { x: 370, y: 200, angle: 0, label: "상대 공격수를 등지고 엉덩이로 밀어내며 박스아웃", isCorrect: true, feedbackTitle: "철벽 박스아웃 & 리바운드 완승!", feedbackDesc: "공 대신 상대를 먼저 몸으로 가두어 골대 접근을 완전히 차단하고 완벽한 수비 리바운드를 쟁취했어요!" }
        },
        locationTipTitle: "박스아웃(Box-out) 3단계 공식",
        locationTipDesc: "1. 슛 순간 상대 확인(Contact) -> 2. 등을 돌려 엉덩이로 밀어내기(Seal) -> 3. 두 손으로 안전하게 낚아채기(Secure)!",
        voiceScript: "슛이 날아갈 때 절대 공만 쳐다보지 마세요! 상대를 먼저 등 뒤에 가두고 엉덩이로 밀어내는 박스아웃이 필수입니다!"
      },
      {
        id: 10,
        title: "5대5 엔드라인 베이스라인 인바운드 패스 차단",
        shortName: "인바운드 방어",
        situationDesc: "경기 종료 직전, 상대가 우리 골대 밑 엔드라인 밖에서 패스를 넣으려 해요! <strong>패서(공 던지는 사람)를 가로막는 당신의 수비 위치는?</strong>",
        attacker: { x: 220, y: 24, angle: 180, label: "인바운더 (선 밖)" },
        axisTarget: { x: 240, y: 80 },
        otherPlayers: [
          { type: 'att', x: 320, y: 140, angle: 180, number: '10', name: '골밑 컷인' },
          { type: 'att', x: 300, y: 260, angle: 180, number: '1', name: '하이포스트' },
          { type: 'att', x: 480, y: 100, angle: 180, number: '7', name: '코너 슈터' },
          { type: 'att', x: 140, y: 260, angle: 180, number: '9', name: '외곽 탈출' },
          { type: 'def', x: 310, y: 110, angle: 0, number: '5', name: '골밑 차단' },
          { type: 'def', x: 300, y: 220, angle: 0, number: '2', name: '하이 수비' },
          { type: 'def', x: 440, y: 90, angle: 0, number: '3', name: '코너 디나이' },
          { type: 'def', x: 170, y: 220, angle: 0, number: '4', name: '윙 디나이' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 220, y: 25, angle: 0, label: "엔드라인 선을 밟고 상대에게 밀착하기", isCorrect: false, feedbackTitle: "테크니컬 파울 & 자유투 실점!", feedbackDesc: "인바운더의 경계선을 침범하면 심판의 테크니컬 파울 휘슬이 불려요!" },
          B: { x: 230, y: 65, angle: 0, label: "선 안쪽에서 양팔을 풍차처럼 흔들며 골밑 패스 차단", isCorrect: true, feedbackTitle: "5초 바이얼레이션 & 스틸 성공!", feedbackDesc: "선을 침범하지 않고 림으로 가는 패스 길목을 온몸으로 가로막아 승리를 확정지었어요!" },
          C: { x: 280, y: 150, angle: 0, label: "골대 밑으로 쑥 물러서기", isCorrect: false, feedbackTitle: "원하는 공격수에게 프리패스 허용!", feedbackDesc: "패서를 방해하지 않으면 상대가 정해진 전술대로 편안하게 패스를 넣어버려요." }
        },
        locationTipTitle: "인바운더 수비의 핵심 포인트",
        locationTipDesc: "절대 엔드라인 선을 넘지 마세요! 선에서 반 발 물러서서 양손을 부지런히 흔들어 가장 위험한 골밑 직행 패스를 온몸으로 차단해야 해요!",
        voiceScript: "인바운드 수비에서는 선을 밟지 않도록 주의하며, 양손을 크게 흔들어 골밑으로 향하는 다이렉트 패스를 완벽하게 막아내세요!"
      },
      {
        id: 11,
        title: "5대5 3-2 지역방어 하이포스트 차단",
        shortName: "3-2 하이포스트",
        situationDesc: "외곽 슛을 막는 3-2 지역방어예요! 상대 빅맨(#10)이 <strong>자유투 라인(하이포스트)으로 번개같이 올라와 패스</strong>를 받으려 해요! 앞선 중앙 수비수인 당신의 위치는?",
        attacker: { x: 300, y: 470, angle: 0, label: "탑 패서 (#1)" },
        axisTarget: { x: 300, y: 270 },
        otherPlayers: [
          { type: 'att', x: 300, y: 270, angle: 0, number: '10', name: '하이 컷인 빅맨' },
          { type: 'att', x: 490, y: 380, angle: -30, number: '7', name: '우측 윙' },
          { type: 'att', x: 110, y: 380, angle: 30, number: '9', name: '좌측 윙' },
          { type: 'att', x: 320, y: 130, angle: 0, number: '11', name: '골밑 센터' },
          { type: 'def', x: 420, y: 370, angle: 150, number: '2', name: '앞선 우측' },
          { type: 'def', x: 180, y: 370, angle: -150, number: '3', name: '앞선 좌측' },
          { type: 'def', x: 440, y: 180, angle: 110, number: '4', name: '뒷선 우측' },
          { type: 'def', x: 160, y: 180, angle: -110, number: '5', name: '뒷선 좌측' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 300, y: 440, angle: 180, label: "탑 공격수 코앞에 붙어있기", isCorrect: false, feedbackTitle: "하이포스트 킬패스 허용!", feedbackDesc: "탑에만 달라붙어 있으면 자유투 라인으로 킬패스가 쏙 들어가 지역방어가 무너져요." },
          B: { x: 300, y: 140, angle: 180, label: "골밑으로 도망가기", isCorrect: false, feedbackTitle: "빅맨의 미들슛 허용!", feedbackDesc: "골밑까지 물러서면 상대 빅맨이 자유투 라인에서 노마크 점퍼를 던져요." },
          C: { x: 300, y: 330, angle: 180, label: "하이포스트 투입로를 가슴으로 차단", isCorrect: true, feedbackTitle: "3-2 지역방어의 핵심 사수!", feedbackDesc: "자유투 라인으로 찔러주는 엔트리 패스 길목을 온몸으로 가로막아 상대 전술을 완벽히 차단했어요!" }
        },
        locationTipTitle: "3-2 지역방어의 최대 약점 수호",
        locationTipDesc: "3-2 존의 중앙 수비수는 탑에서 자유투 라인(하이포스트)으로 이어지는 킬패스를 차단하는 것이 가장 중요한 임무입니다!",
        voiceScript: "3-2 지역방어에서는 자유투 라인으로 찔러주는 패스를 중앙 수비수가 미리 가로막아야 완벽한 방어가 완성됩니다!"
      },
      {
        id: 12,
        title: "5대5 풀코트 프레스 트랩 (Full Court Trap)",
        shortName: "풀코트 트랩",
        situationDesc: "경기 막판 풀코트 압박 수비! 상대 포인트가드(#1)가 <strong>하프라인을 넘기 직전 사이드라인 구석</strong>에 갇혔어요! 완벽한 트랩(더블팀) 위치는?",
        attacker: { x: 140, y: 640, angle: 20, label: "하프라인 부근 #1" },
        axisTarget: { x: 140, y: 640 },
        otherPlayers: [
          { type: 'att', x: 440, y: 620, angle: -30, number: '7', name: '백코트 가드' },
          { type: 'att', x: 300, y: 440, angle: 0, number: '9', name: '전방 포워드' },
          { type: 'att', x: 480, y: 350, angle: -40, number: '10', name: '전방 슈터' },
          { type: 'att', x: 160, y: 220, angle: 30, number: '11', name: '전방 센터' },
          { type: 'def', x: 120, y: 580, angle: -160, number: '2', name: '사이드 차단 동료' },
          { type: 'def', x: 300, y: 480, angle: 180, number: '3', name: '중앙 인터셉트' },
          { type: 'def', x: 420, y: 380, angle: 150, number: '4', name: '외곽 견제' },
          { type: 'def', x: 250, y: 200, angle: 180, number: '5', name: '골밑 지킴이' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 180, y: 600, angle: -130, label: "중앙 탈출로를 꺾어 막는 더블팀", isCorrect: true, feedbackTitle: "환상적인 풀코트 트랩 & 턴오버 유도!", feedbackDesc: "사이드라인과 하프라인의 모서리(코핀 코너)로 상대를 몰고 두 명이 V자로 에워싸 8초 바이얼레이션을 유도했어요!" },
          B: { x: 300, y: 620, angle: 180, label: "중앙선 한가운데 서있기", isCorrect: false, feedbackTitle: "트랩 찬스 무산!", feedbackDesc: "중앙에 멀뚱히 서 있으면 가드가 중앙으로 드리블을 치고 나와 탈출해요." },
          C: { x: 130, y: 680, angle: 0, label: "등 뒤에서 공 빼앗으려 덤비기", isCorrect: false, feedbackTitle: "뒤쪽 접촉 파울!", feedbackDesc: "뒤에서 손을 집어넣으면 심판의 리칭 파울이 불려요." }
        },
        locationTipTitle: "코핀 코너(Coffin Corner) 트랩 공식",
        locationTipDesc: "하프라인과 사이드라인이 만나는 모서리는 탈출구가 없는 지옥의 코너입니다! 두 수비수가 팔을 높이 들고 각을 좁히세요.",
        voiceScript: "하프라인 구석에서는 두 선수가 V자로 각을 좁혀 탈출로를 봉쇄하는 질식 트랩을 펼치세요!"
      },
      {
        id: 13,
        title: "5대5 박스 앤드 원 (Box-and-One) 에이스 전담 마크",
        shortName: "박스 앤드 원",
        situationDesc: "4명은 페인트존에 박스 존(Box)을 쳤어요! 당신은 <strong>상대 팀 득점왕 3점 슈터(#24)를 1초도 안 놓치는 전담 맨투맨 수비수</strong>입니다. 올바른 위치는?",
        attacker: { x: 450, y: 400, angle: -30, label: "상대 에이스 (#24)" },
        axisTarget: { x: 450, y: 400 },
        otherPlayers: [
          { type: 'att', x: 300, y: 480, angle: 0, number: '1', name: '상대 포인트가드' },
          { type: 'att', x: 140, y: 390, angle: 30, number: '9', name: '좌측 윙' },
          { type: 'att', x: 400, y: 180, angle: -50, number: '10', name: '우측 빅맨' },
          { type: 'att', x: 200, y: 180, angle: 50, number: '11', name: '좌측 빅맨' },
          { type: 'def', x: 350, y: 300, angle: 140, number: '2', name: '박스 존 1' },
          { type: 'def', x: 250, y: 300, angle: -140, number: '3', name: '박스 존 2' },
          { type: 'def', x: 360, y: 160, angle: 110, number: '4', name: '박스 존 3' },
          { type: 'def', x: 240, y: 160, angle: -110, number: '5', name: '박스 존 4' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 300, y: 220, angle: 180, label: "나도 페인트존 박스 존에 합류하기", isCorrect: false, feedbackTitle: "에이스 노마크 3점 허용!", feedbackDesc: "당신마저 존에 들어가면 에이스 슈터에게 공이 연결되어 폭풍 득점을 내줘요!" },
          B: { x: 400, y: 335, angle: 150, label: "에이스 몸에 그림자처럼 붙어 디나이", isCorrect: true, feedbackTitle: "에이스 완벽 봉쇄! 박스앤원 마스터!", feedbackDesc: "동료 4명이 골밑을 지켜주므로, 당신은 에이스가 공을 만지지도 못하게 그림자처럼 따라붙어 무력화했어요!" },
          C: { x: 500, y: 460, angle: -45, label: "에이스 등 뒤에서 구경하기", isCorrect: false, feedbackTitle: "프리 패스 허용!", feedbackDesc: "등 뒤에 서 있으면 에이스가 가볍게 공을 잡아 슛을 던져요." }
        },
        locationTipTitle: "박스 앤드 원(Box-and-One)의 원칙",
        locationTipDesc: "전담 수비수는 골밑 헬프에 신경 쓰지 말고, 오직 상대 에이스 슈터에게 패스가 가지 못하도록 그림자처럼 밀착해야 합니다!",
        voiceScript: "박스 앤드 원에서는 동료들을 믿고, 오직 상대 에이스 슈터에게 공이 가지 않도록 철저한 디나이를 펼치세요!"
      },
      {
        id: 14,
        title: "5대5 속공 3대2 수적 열세 트라이앵글 수비",
        shortName: "3대2 속공 방어",
        situationDesc: "상대 3명이 노마크 속공으로 질주해 와요! 수비는 <strong>당신과 동료 단 2명</strong>뿐! 뒷선 수비수로서 가장 위협적인 골밑 레이업을 막을 위치는?",
        attacker: { x: 300, y: 480, angle: 0, label: "속공 가드 #1 (볼)" },
        axisTarget: { x: 300, y: 160 },
        otherPlayers: [
          { type: 'att', x: 450, y: 420, angle: -30, number: '7', name: '우측 윙 속공' },
          { type: 'att', x: 150, y: 420, angle: 30, number: '9', name: '좌측 윙 속공' },
          { type: 'att', x: 400, y: 640, angle: 0, number: '10', name: '뒤따라오는 센터' },
          { type: 'att', x: 200, y: 640, angle: 0, number: '11', name: '뒤따라오는 포워드' },
          { type: 'def', x: 300, y: 360, angle: 180, number: '2', name: '앞선 수비 동료' },
          { type: 'def', x: 430, y: 580, angle: 180, number: '3', name: '전속력 백코트 중' },
          { type: 'def', x: 170, y: 580, angle: 180, number: '4', name: '전속력 백코트 중' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 160, angle: 180, label: "골대 바로 앞 페인트존 사수 (림 프로텍션)", isCorrect: true, feedbackTitle: "교과서적인 탠덤(Tandem) 수비 성공!", feedbackDesc: "앞선 동료가 1차 지연을 시키는 동안 골밑 가장 확실한 2점(레이업)을 결사 차단하여 아군이 복귀할 시간을 벌었어요!" },
          B: { x: 300, y: 380, angle: 180, label: "앞선 동료 옆으로 달려가 덤비기", isCorrect: false, feedbackTitle: "골밑 앨리웁 덩크 허용!", feedbackDesc: "둘 다 앞으로 덤비면 양쪽 윙으로 패스가 한 번만 돌아도 골밑이 텅 비어 실점해요." },
          C: { x: 480, y: 250, angle: -90, label: "오른쪽 사이드로 피하기", isCorrect: false, feedbackTitle: "중앙 고속도로 개통!", feedbackDesc: "골밑 앞길을 비워두면 공격수가 여유롭게 노마크 레이업을 올려놓아요." }
        },
        locationTipTitle: "3대2 수적 열세 탠덤(Tandem) 수비",
        locationTipDesc: "2명의 수비수는 앞뒤로 'I자(위아래)'로 섭니다! 위쪽 선수가 볼을 지연시키고, 아래쪽 선수는 골밑 레이업을 결사 차단해야 합니다!",
        voiceScript: "3대2 수적 열세에서는 뒷선 수비수가 반드시 골대 바로 앞을 사수하여 가장 확실한 레이업을 막아내야 합니다!"
      },
      {
        id: 15,
        title: "5대5 경기 종료 5초 전 3점슛 결사 저지",
        shortName: "노쓰리(No-3) 수비",
        situationDesc: "우리 팀이 3점 앞선 경기 종료 5초 전! 상대는 <strong>오직 동점 3점슛</strong>만 노리고 있어요! 골밑 돌파는 주고 3점만은 결사 차단할 당신의 위치는?",
        attacker: { x: 450, y: 430, angle: -30, label: "3점 노리는 #7" },
        axisTarget: { x: 450, y: 430 },
        otherPlayers: [
          { type: 'att', x: 300, y: 490, angle: 0, number: '1', name: '탑' },
          { type: 'att', x: 150, y: 430, angle: 30, number: '9', name: '좌측 3점' },
          { type: 'att', x: 500, y: 180, angle: -80, number: '10', name: '코너 3점' },
          { type: 'att', x: 100, y: 180, angle: 80, number: '11', name: '코너 3점' },
          { type: 'def', x: 300, y: 420, angle: 180, number: '2', name: '탑 3점 차단' },
          { type: 'def', x: 180, y: 370, angle: -150, number: '3', name: '좌측 3점 차단' },
          { type: 'def', x: 450, y: 190, angle: 100, number: '4', name: '코너 3점 차단' },
          { type: 'def', x: 150, y: 190, angle: -100, number: '5', name: '코너 3점 차단' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 320, y: 220, angle: 180, label: "골밑 페인트존에 물러서서 대기", isCorrect: false, feedbackTitle: "버저비터 동점 3점슛 실점!", feedbackDesc: "이 상황에서 골밑으로 물러서면 상대가 3점슛을 여유롭게 던져 동점을 만들어버려요!" },
          B: { x: 430, y: 390, angle: 150, label: "3점 라인에 바짝 붙어 슛 모션 원천 봉쇄", isCorrect: true, feedbackTitle: "경기 종료! 챔피언 우승 확정!", feedbackDesc: "파울을 범하지 않고 3점 라인 밖에서 슛 시도 자체를 원천 봉쇄하여 짜릿한 승리를 지켜냈어요!" },
          C: { x: 450, y: 420, angle: 150, label: "슛 쏘는 상대에게 몸으로 덤벼들기", isCorrect: false, feedbackTitle: "3점슛 파울 & 자유투 3개 헌납!", feedbackDesc: "무리하게 몸으로 덤비면 3점슛 파울을 범해 자유투 3개로 역전패당할 수 있어요." }
        },
        locationTipTitle: "경기 막판 노쓰리(No-Threes) 수비",
        locationTipDesc: "3점 차로 이기고 있을 때는 골밑 2점을 내주더라도 절대 3점슛을 쏘지 못하게 3점 라인에 바짝 붙어 슛 모션을 차단하세요!",
        voiceScript: "3점 차 리드 상황에서는 골밑 2점을 내주더라도 3점 라인에 밀착하여 동점 3점슛을 절대 허용하지 마세요!"
      },
      {
        id: 16,
        title: "5대5 혼합수비 트라이앵글 앤드 투 (Triangle-and-Two)",
        shortName: "트라이앵글 앤 투",
        situationDesc: "상대 쌍포 가드 2명을 맨투맨으로 묶고, 3명이 페인트존 삼각 존을 쳤어요! <strong>상대 메인 가드(#1)를 전담 마크할 위치</strong>는?",
        attacker: { x: 300, y: 480, angle: 0, label: "상대 메인 가드 #1" },
        axisTarget: { x: 300, y: 480 },
        otherPlayers: [
          { type: 'att', x: 460, y: 390, angle: -30, number: '7', name: '상대 2번 슈터' },
          { type: 'att', x: 140, y: 390, angle: 30, number: '9', name: '외곽 포워드' },
          { type: 'att', x: 400, y: 180, angle: -50, number: '10', name: '빅맨' },
          { type: 'att', x: 200, y: 180, angle: 50, number: '11', name: '센터' },
          { type: 'def', x: 430, y: 340, angle: 140, number: '2', name: '2번 전담 수비' },
          { type: 'def', x: 300, y: 160, angle: 180, number: '3', name: '삼각 존 탑' },
          { type: 'def', x: 370, y: 120, angle: 120, number: '4', name: '삼각 존 우측' },
          { type: 'def', x: 230, y: 120, angle: -120, number: '5', name: '삼각 존 좌측' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 300, y: 220, angle: 180, label: "페인트존 삼각 존에 같이 들어가기", isCorrect: false, feedbackTitle: "가드 오픈 3점 폭격!", feedbackDesc: "전담 수비수가 존으로 들어가면 상대 핵심 가드가 노마크 3점을 퍼부어요." },
          B: { x: 300, y: 550, angle: 0, label: "가드 등 뒤에서 바라보기", isCorrect: false, feedbackTitle: "돌파 허용!", feedbackDesc: "등 뒤에 서 있으면 가드가 아무 방해 없이 골밑으로 직진해요." },
          C: { x: 300, y: 400, angle: 180, label: "가드 앞 팔 하나 거리에서 그림자 밀착", isCorrect: true, feedbackTitle: "트라이앵글 앤 투 완벽 수행!", feedbackDesc: "골밑의 삼각 존을 믿고, 상대 에이스 가드가 공을 편히 다루지 못하도록 그림자처럼 밀착해 무력화했어요!" }
        },
        locationTipTitle: "트라이앵글 앤 투(Triangle-and-Two) 전술",
        locationTipDesc: "두 명의 전담 수비수는 골밑 도움 수비를 생각하지 말고, 오직 상대 핵심 스코어러 2명을 1초도 놓치지 않고 괴롭혀야 합니다!",
        voiceScript: "트라이앵글 앤 투에서는 동료들의 골밑 존을 믿고, 맡은 에이스 가드에게 그림자처럼 밀착해야 합니다!"
      },
      {
        id: 17,
        title: "5대5 스페인 픽앤롤(Spain Pick & Roll) 백스크린 대처",
        shortName: "스페인 픽앤롤",
        situationDesc: "가드 스크린 뒤에 또 다른 슈터가 백스크린을 거는 복합 전술! <strong>골밑으로 쇄도하는 롤맨(#10)의 덩크를 막을 위치</strong>는?",
        attacker: { x: 340, y: 440, angle: -20, label: "가드 #1 (볼)" },
        axisTarget: { x: 300, y: 180 },
        otherPlayers: [
          { type: 'att', x: 300, y: 240, angle: 0, number: '10', name: '골밑 쇄도 롤맨' },
          { type: 'att', x: 260, y: 350, angle: 30, number: '7', name: '백스크리너 슈터' },
          { type: 'att', x: 480, y: 360, angle: -40, number: '9', name: '우측 윙' },
          { type: 'att', x: 120, y: 180, angle: 70, number: '11', name: '코너' },
          { type: 'def', x: 350, y: 390, angle: 160, number: '2', name: '체이싱 가드' },
          { type: 'def', x: 240, y: 320, angle: -140, number: '3', name: '스크린 걸린 동료' },
          { type: 'def', x: 440, y: 310, angle: 130, number: '4', name: '윙 수비' },
          { type: 'def', x: 150, y: 170, angle: -110, number: '5', name: '코너 수비' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 260, y: 380, angle: 180, label: "외곽 백스크리너 옆에 우두커니 서기", isCorrect: false, feedbackTitle: "골밑 백도어 슬램덩크 허용!", feedbackDesc: "외곽에 머물러 있으면 골밑으로 뚫고 들어간 롤맨에게 프리 앨리웁 덩크를 헌납해요." },
          B: { x: 300, y: 160, angle: 180, label: "골대 바로 앞 페인트존을 선점해 롤맨 차단", isCorrect: true, feedbackTitle: "최첨단 스페인 픽앤롤 격파!", feedbackDesc: "백스크린에 걸린 동료를 대신해 제3의 수비수가 골밑 최후의 보루를 먼저 선점해 실점을 완벽히 막아냈어요!" },
          C: { x: 400, y: 440, angle: 180, label: "볼 가드에게 무작정 덤벼들기", isCorrect: false, feedbackTitle: "골밑 텅 비어 실점!", feedbackDesc: "골밑 앞길을 비워두면 쉬운 득점을 내줘요." }
        },
        locationTipTitle: "스페인 픽앤롤 해법: 제3자의 림 프로텍션",
        locationTipDesc: "백스크린으로 인해 빅맨이 묶였을 때는 약측(Weak-side) 수비수가 지체 없이 골밑으로 뛰어들어 롤맨의 레이업을 가로막아야 합니다!",
        voiceScript: "복합 스페인 픽앤롤에서는 골밑으로 뛰어드는 롤맨의 앞길을 제3의 수비수가 골대 앞에서 선제 차단해야 합니다!"
      },
      {
        id: 18,
        title: "5대5 1-3-1 지역방어(Zone) 탑 체이서(Chaser) 수비",
        shortName: "1-3-1 체이서",
        situationDesc: "상대 패스 줄기를 교란하는 1-3-1 지역방어예요! <strong>최전선 탑에서 상대 포인트가드(#1)를 압박할 당신의 위치</strong>는?",
        attacker: { x: 300, y: 490, angle: 0, label: "상대 가드 #1" },
        axisTarget: { x: 300, y: 490 },
        otherPlayers: [
          { type: 'att', x: 480, y: 380, angle: -30, number: '7', name: '우측 윙' },
          { type: 'att', x: 120, y: 380, angle: 30, number: '9', name: '좌측 윙' },
          { type: 'att', x: 300, y: 280, angle: 0, number: '10', name: '하이포스트' },
          { type: 'att', x: 300, y: 130, angle: 0, number: '11', name: '로우포스트' },
          { type: 'def', x: 430, y: 330, angle: 140, number: '2', name: '우측 날개' },
          { type: 'def', x: 170, y: 330, angle: -140, number: '3', name: '좌측 날개' },
          { type: 'def', x: 300, y: 250, angle: 180, number: '4', name: '중앙 빅맨' },
          { type: 'def', x: 300, y: 110, angle: 180, number: '5', name: '뒷선 슬라이더' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 420, angle: 180, label: "양팔을 풍차처럼 휘저으며 탑 패스 줄기 교란", isCorrect: true, feedbackTitle: "1-3-1 체이서의 정석! 턴오버 유도!", feedbackDesc: "가장 높은 곳에서 상대 시야를 완벽히 가리고 양쪽 윙으로 가는 편안한 패스 줄기를 온몸으로 방해했어요!" },
          B: { x: 300, y: 280, angle: 180, label: "자유투 라인까지 내려가 쉬기", isCorrect: false, feedbackTitle: "앞선 압박 실종!", feedbackDesc: "체이서가 물러서면 상대 가드가 편안하게 전술 패스를 배급해요." },
          C: { x: 450, y: 420, angle: 150, label: "오른쪽 사이드로 치우치기", isCorrect: false, feedbackTitle: "중앙 고속도로 개통!", feedbackDesc: "탑을 비워두면 중앙으로 편안한 슛이나 돌파를 허용해요." }
        },
        locationTipTitle: "1-3-1 체이서의 핵심: 롱 암(Long Arm)",
        locationTipDesc: "1-3-1의 꼭짓점 체이서는 끊임없이 발을 움직이고 긴 팔을 저어 상대 가드가 코트 전체를 편하게 보지 못하게 만들어야 합니다!",
        voiceScript: "1-3-1 지역방어의 탑 체이서는 양팔을 부지런히 흔들어 상대 가드의 패스 길목을 교란해야 합니다!"
      },
      {
        id: 19,
        title: "5대5 2-3 지역방어 코너 트랩 로테이션 (Corner Trap)",
        shortName: "2-3 코너 트랩",
        situationDesc: "2-3 지역방어에서 코너로 볼이 투입됐어요! <strong>뒷선 날개와 함께 코너 공격수(#7)를 가둘 앞선 가드의 위치</strong>는?",
        attacker: { x: 490, y: 160, angle: -80, label: "코너 공 소유 #7" },
        axisTarget: { x: 490, y: 160 },
        otherPlayers: [
          { type: 'att', x: 300, y: 470, angle: 0, number: '1', name: '탑' },
          { type: 'att', x: 460, y: 360, angle: -30, number: '9', name: '우측 윙' },
          { type: 'att', x: 120, y: 380, angle: 30, number: '10', name: '반대편 윙' },
          { type: 'att', x: 300, y: 160, angle: 0, number: '11', name: '골밑 센터' },
          { type: 'def', x: 460, y: 130, angle: 100, number: '2', name: '뒷선 날개 동료' },
          { type: 'def', x: 260, y: 380, angle: 180, number: '3', name: '탑 가드' },
          { type: 'def', x: 320, y: 140, angle: 180, number: '4', name: '골밑 센터 수비' },
          { type: 'def', x: 180, y: 180, angle: -120, number: '5', name: '반대편 날개' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 300, y: 400, angle: 180, label: "탑 3점 라인에 멍하니 서있기", isCorrect: false, feedbackTitle: "코너 3점슛 헌납!", feedbackDesc: "앞선 가드가 내려오지 않으면 코너에 있는 선수가 편안하게 오픈 3점을 던져요." },
          B: { x: 300, y: 180, angle: 180, label: "골대 밑으로 도망가기", isCorrect: false, feedbackTitle: "트랩 실패!", feedbackDesc: "가둘 수 있는 코너 찬스를 놓치게 돼요." },
          C: { x: 450, y: 220, angle: 120, label: "윙으로 나가는 패스 길목을 꺾어 막는 트랩", isCorrect: true, feedbackTitle: "2-3 지역방어의 꽃! 코너 트랩 성공!", feedbackDesc: "뒷선 동료와 함께 코너를 V자로 덮쳐 외곽으로 나가는 탈출 패스를 차단하고 완벽한 턴오버를 유도했어요!" }
        },
        locationTipTitle: "2-3 존의 코너 트랩(Corner Trap)",
        locationTipDesc: "코너로 공이 가면 뒷선 날개가 1차로 붙고, 앞선 가드가 윙 패스를 끊으며 내려와 질식 더블팀을 완성해야 합니다!",
        voiceScript: "2-3 지역방어에서는 코너로 공이 갈 때 앞선 가드가 신속히 내려와 뒷선과 함께 출구를 틀어막아야 합니다!"
      },
      {
        id: 20,
        title: "5대5 파이널 챔피언십 4쿼터 버저비터 총력전 수비",
        shortName: "챔피언십 결사 수비",
        situationDesc: "전국대회 결승 4쿼터 종료 3초 전! 1점 차 리드! 상대의 <strong>마지막 작전타임 후 인바운드 올인 공격</strong>을 막을 최종 위치는?",
        attacker: { x: 300, y: 450, angle: 0, label: "패스 받는 결승 슛 에이스" },
        axisTarget: { x: 300, y: 450 },
        otherPlayers: [
          { type: 'att', x: 50, y: 350, angle: 90, number: '1', name: '사이드 인바운더' },
          { type: 'att', x: 460, y: 380, angle: -30, number: '7', name: '우측 3점' },
          { type: 'att', x: 140, y: 380, angle: 30, number: '9', name: '좌측 3점' },
          { type: 'att', x: 300, y: 180, angle: 0, number: '11', name: '골밑 센터' },
          { type: 'def', x: 80, y: 350, angle: -90, number: '2', name: '인바운드 방어' },
          { type: 'def', x: 420, y: 330, angle: 140, number: '3', name: '우측 디나이' },
          { type: 'def', x: 180, y: 330, angle: -140, number: '4', name: '좌측 디나이' },
          { type: 'def', x: 300, y: 140, angle: 180, number: '5', name: '골밑 차단' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 300, y: 440, angle: 180, label: "슛 쏘는 손을 치려고 무리하게 점프", isCorrect: false, feedbackTitle: "버저비터 파울 & 역전 자유투 패배!", feedbackDesc: "마지막 순간 손을 치면 파울이 불려 통한의 역전패를 당하고 말아요!" },
          B: { x: 300, y: 350, angle: 180, label: "골대-공격수 일직선에서 완벽한 수직 만세 자세", isCorrect: true, feedbackTitle: "전국대회 전승 우승! 전설의 수비왕 등극!", feedbackDesc: "끝까지 냉정하게 두 발을 땅에 딛고 수직으로 솟아올라 상대의 마지막 슛을 에어볼로 만들어 대망의 챔피언에 등극했어요!" },
          C: { x: 300, y: 180, angle: 180, label: "골밑으로 물러나 슛 구경하기", isCorrect: false, feedbackTitle: "역전 버저비터 헌납!", feedbackDesc: "물러서면 상대 에이스가 시원하게 위닝 버저비터를 성공시켜요." }
        },
        locationTipTitle: "전설의 수비왕이 되는 마지막 비결",
        locationTipDesc: "농구 수비의 가장 위대한 기술은 '절대 파울을 범하지 않고 자신의 자리를 지켜내는 정직한 발자국'입니다!",
        voiceScript: "마지막 순간까지 두 발을 땅에 굳건히 딛고 양손을 수직으로 뻗어 실점과 파울을 모두 막아내는 것이 최고의 수비입니다!"
      }
    ]
  };

  // DOM 요소 선택
  const modeTabBtns = document.querySelectorAll('.mode-tab-btn');
  const otherPlayersGroup = document.getElementById('otherPlayersGroup');
  const attackerMarker = document.getElementById('attackerMarker');
  const attackerFeetGroup = document.getElementById('attackerFeetGroup');
  const attackerLabelText = document.getElementById('attackerLabelText');
  const defenseCandidatesGroup = document.getElementById('defenseCandidatesGroup');
  const quizNavBar = document.getElementById('quizNavBar');
  const boardControlsBar = document.getElementById('boardControlsBar');
  const matchCountMinusBtn = document.getElementById('matchCountMinusBtn');
  const matchCountPlusBtn = document.getElementById('matchCountPlusBtn');
  const matchCountDisplay = document.getElementById('matchCountDisplay');
  const matchChipsRow = document.getElementById('matchChipsRow');
  const addAttackerBtn = document.getElementById('addAttackerBtn');
  const addDefenderBtn = document.getElementById('addDefenderBtn');
  const clearBoardBtn = document.getElementById('clearBoardBtn');
  const toggleGuideLines = document.getElementById('toggleGuideLines');

  const boardRotationToolbar = document.getElementById('boardRotationToolbar');
  const rotateTargetLabel = document.getElementById('rotateTargetLabel');
  const rotateLeftBtn = document.getElementById('rotateLeftBtn');
  const rotateRightBtn = document.getElementById('rotateRightBtn');
  const rotateFaceRimBtn = document.getElementById('rotateFaceRimBtn');

  const boardDragLayer = document.getElementById('boardDragLayer');
  const boardGuideGroup = document.getElementById('boardGuideGroup');
  const boardAxisLine = document.getElementById('boardAxisLine');
  const idealDefenseZone = document.getElementById('idealDefenseZone');
  const boardPlayersGroup = document.getElementById('boardPlayersGroup');
  const boardBallElement = document.getElementById('boardBallElement');

  const defenseAxisLine = document.getElementById('defenseAxisLine');
  const instructionBanner = document.getElementById('instructionBanner');
  const currentQuizBadge = document.getElementById('currentQuizBadge');
  const currentQuizTitle = document.getElementById('currentQuizTitle');
  const courtBottomQuizCard = document.getElementById('courtBottomQuizCard');
  const courtQuizDesc = document.getElementById('courtQuizDesc');
  const courtQuizBadge = document.getElementById('courtQuizBadge');
  const courtQuizTitle = document.getElementById('courtQuizTitle');
  const topTooltipLayer = document.getElementById('topTooltipLayer');
  const topTooltipBg = document.getElementById('topTooltipBg');
  const topTooltipArrow = document.getElementById('topTooltipArrow');
  const topTooltipText = document.getElementById('topTooltipText');
  const feedbackToast = document.getElementById('feedbackToast');
  const feedbackIcon = document.getElementById('feedbackIcon');
  const feedbackTitle = document.getElementById('feedbackTitle');
  const feedbackDesc = document.getElementById('feedbackDesc');
  const guideModal = document.getElementById('guideModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const nextOrRetryBtn = document.getElementById('nextOrRetryBtn');
  const modalActionBtnText = document.getElementById('modalActionBtnText');
  const resetAppBtn = document.getElementById('resetAppBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const defenseModeBtn = document.getElementById('defenseModeBtn');
  const offenseModeBtn = document.getElementById('offenseModeBtn');
  const ttsSpeakBtn = document.getElementById('ttsSpeakBtn');
  const helperTitle = document.getElementById('helperTitle');
  const helperText = document.getElementById('helperText');
  const confettiCanvas = document.getElementById('confettiCanvas');
  const quizChipsContainer = document.getElementById('quizChipsContainer');
  const prevQuizBtn = document.getElementById('prevQuizBtn');
  const nextQuizBtn = document.getElementById('nextQuizBtn');
  const scoreText = document.getElementById('scoreText');
  const locationTipTitle = document.getElementById('locationTipTitle');
  const locationTipDesc = document.getElementById('locationTipDesc');

  // 모달 탭 및 전술 해설 요소
  const viewTacticsTabBtn = document.getElementById('viewTacticsTabBtn');
  const viewStanceTabBtn = document.getElementById('viewStanceTabBtn');
  const modalTacticsView = document.getElementById('modalTacticsView');
  const modalStanceView = document.getElementById('modalStanceView');
  const modalTag = document.getElementById('modalTag');
  const modalMainTitle = document.getElementById('modalMainTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const tacticsConceptTitle = document.getElementById('tacticsConceptTitle');
  const tacticsConceptDesc = document.getElementById('tacticsConceptDesc');
  const tacticsDangerPoint = document.getElementById('tacticsDangerPoint');
  const tacticsDefenseTitle = document.getElementById('tacticsDefenseTitle');
  const tacticsDefenseDesc = document.getElementById('tacticsDefenseDesc');
  const tacticsSecretPoint = document.getElementById('tacticsSecretPoint');

  const clearModal = document.getElementById('clearModal');
  const clearModalTitle = document.getElementById('clearModalTitle');
  const clearModalSub = document.getElementById('clearModalSub');
  const clearModalPraise = document.getElementById('clearModalPraise');
  const replayAllBtn = document.getElementById('replayAllBtn');
  const finalScoreText = document.getElementById('finalScoreText');

  // 상태 관리
  let currentMode = '1v1'; // '1v1' | '2v2' | '3v3' | '5v5' | 'board'
  let currentQuizIndex = 0;
  let solvedQuizzes = {
    '1v1': new Set(),
    '2v2': new Set(),
    '3v3': new Set(),
    '5v5': new Set()
  };
  let soundEnabled = true;
  let currentStep = 'init';
  let autoOpenGuideTimer = null;

  // ================= 1. Web Audio 사운드 =================
  class SoundEffects {
    constructor() { this.ctx = null; }
    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.ctx = new AudioContext();
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    }
    playClick() {
      if (!soundEnabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    }
    playCorrect() {
      if (!soundEnabled) return;
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.09 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.09);
        osc.stop(this.ctx.currentTime + idx * 0.09 + 0.25);
      });
    }
    playWrong() {
      if (!soundEnabled) return;
      this.init();
      if (!this.ctx) return;
      const notes = [330, 246.94];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.14);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.14 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.14);
        osc.stop(this.ctx.currentTime + idx * 0.14 + 0.2);
      });
    }
  }
  const sfx = new SoundEffects();

  // ================= 2. 컨페티 폭죽 =================
  class ConfettiEffect {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.animationId = null;
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    burst() {
      this.particles = [];
      const colors = ['#ea580c', '#f97316', '#10b981', '#2563eb', '#fbbf24', '#ec4899'];
      for (let i = 0; i < 70; i++) {
        this.particles.push({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          vx: (Math.random() - 0.5) * 16,
          vy: (Math.random() - 0.7) * 18,
          size: Math.random() * 8 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          gravity: 0.35,
          opacity: 1
        });
      }
      if (!this.animationId) this.render();
    }
    render() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.particles.forEach((p, index) => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.012;
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        this.ctx.restore();
        if (p.opacity <= 0 || p.y > window.innerHeight) {
          this.particles.splice(index, 1);
        }
      });
      if (this.particles.length > 0) {
        this.animationId = requestAnimationFrame(() => this.render());
      } else {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }
  const confetti = new ConfettiEffect(confettiCanvas);

  // ================= 3. TTS 음성 안내 =================
  function speakCurrentQuizGuide() {
    if (!('speechSynthesis' in window)) {
      alert('죄송해요, 현재 브라우저는 음성 읽기 기능을 지원하지 않아요!');
      return;
    }
    window.speechSynthesis.cancel();
    const qList = modeData[currentMode];
    const q = qList[currentQuizIndex];
    const script = `${q.title}! ${q.voiceScript} 무릎을 굽히고, 빨간색 공격수를 주시하며 올바른 발자국 스탠스를 지키세요!`;

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.95;
    utterance.pitch = 1.1;

    const voices = window.speechSynthesis.getVoices();
    const koreanVoice = voices.find(v => v.lang.includes('ko'));
    if (koreanVoice) utterance.voice = koreanVoice;

    window.speechSynthesis.speak(utterance);
  }

  // ================= 4. 모드 전환 핸들러 =================
  modeTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedMode = btn.getAttribute('data-mode');
      if (currentMode === selectedMode) return;
      sfx.playClick();
      modeTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentMode = selectedMode;

      if (currentMode === 'board') {
        if (quizNavBar) quizNavBar.classList.add('hidden');
        if (courtBottomQuizCard) courtBottomQuizCard.classList.add('hidden');
        if (boardRotationToolbar) boardRotationToolbar.classList.add('hidden');
        if (boardControlsBar) boardControlsBar.classList.remove('hidden');
        initBoardMode();
      } else {
        if (boardControlsBar) boardControlsBar.classList.add('hidden');
        if (boardRotationToolbar) boardRotationToolbar.classList.add('hidden');
        if (quizNavBar) quizNavBar.classList.remove('hidden');
        if (boardDragLayer) boardDragLayer.classList.add('hidden');
        if (attackerMarker) attackerMarker.style.display = 'block';
        currentQuizIndex = 0;
        initNavChips();
        loadQuiz(0);
      }
    });
  });

  // ================= 5. 네비게이션 칩 UI 초기화 =================
  function initNavChips() {
    if (currentMode === 'board' || !modeData[currentMode]) return;
    quizChipsContainer.innerHTML = '';
    const qList = modeData[currentMode];
    qList.forEach((q, index) => {
      const chip = document.createElement('button');
      chip.className = `quiz-chip-btn ${index === currentQuizIndex ? 'active' : ''}`;
      chip.id = `chipQuiz${q.id}`;
      chip.innerHTML = `${q.id}`;
      chip.title = `${q.id}번: ${q.title}`;
      chip.addEventListener('click', () => {
        sfx.playClick();
        loadQuiz(index);
      });
      quizChipsContainer.appendChild(chip);
    });
    updateNavState();
  }

  function updateNavState() {
    if (currentMode === 'board' || !modeData[currentMode]) return;
    const qList = modeData[currentMode];
    const modeSolved = solvedQuizzes[currentMode];

    qList.forEach((q, index) => {
      const chip = document.getElementById(`chipQuiz${q.id}`);
      if (chip) {
        chip.classList.toggle('active', index === currentQuizIndex);
        chip.classList.toggle('solved', modeSolved.has(q.id));
      }
    });

    prevQuizBtn.disabled = (currentQuizIndex === 0);
    nextQuizBtn.disabled = (currentQuizIndex === qList.length - 1);
    scoreText.innerText = `맞힌 문제: ${modeSolved.size} / ${qList.length}`;
  }

  // ================= 5-1. 자유 전술판 엔진 (1:1~5:5, 드래그 & 회전) =================
  let boardPlayers = [];
  let currentBoardMatchSize = 2; // 1 ~ 5
  let selectedPlayerId = null;   // 현재 선택된 선수 ID
  let activeDragId = null;       // 이동 드래그 중인 선수 ID
  let activeRotateId = null;     // 회전 조작 중인 선수 ID
  let isRotating = false;        // 화살표 머리를 잡고 회전 중인지 여부
  let isDraggingBall = false;    // 농구공을 마우스로 잡고 이동 중인지 여부
  let boardBall = { x: 300, y: 460, holderId: 'att_1' }; // 전술판 농구공 상태 객체
  let dragStartPos = { x: 0, y: 0 };
  let hasMovedSignificantly = false;
  let showGuides = true;

  // 1대1 ~ 5대5 기본 배치 프리셋
  function getMatchPresets(size) {
    if (size === 1) {
      return [
        { id: 'att_1', type: 'att', hasBall: true, x: 300, y: 460, angle: 0, number: '7', label: '공 가진 공격수' },
        { id: 'def_1', type: 'def', isPlayer: true, x: 300, y: 360, angle: 180, number: '10', label: '수비 대장' }
      ];
    }
    if (size === 2) {
      return [
        { id: 'att_1', type: 'att', hasBall: true, x: 300, y: 460, angle: 0, number: '7', label: '공 가진 #7' },
        { id: 'att_2', type: 'att', hasBall: false, x: 440, y: 380, angle: -25, number: '9', label: '공격수 9' },
        { id: 'def_1', type: 'def', isPlayer: true, x: 300, y: 360, angle: 180, number: '10', label: '수비 대장' },
        { id: 'def_2', type: 'def', isPlayer: false, x: 380, y: 310, angle: 155, number: '3', label: '동료 수비' }
      ];
    }
    if (size === 3) {
      return [
        { id: 'att_1', type: 'att', hasBall: true, x: 300, y: 460, angle: 0, number: '1', label: '탑 볼핸들러' },
        { id: 'att_2', type: 'att', hasBall: false, x: 160, y: 380, angle: 25, number: '7', label: '좌측 윙' },
        { id: 'att_3', type: 'att', hasBall: false, x: 440, y: 380, angle: -25, number: '9', label: '우측 윙' },
        { id: 'def_1', type: 'def', isPlayer: true, x: 300, y: 360, angle: 180, number: '10', label: '수비 대장' },
        { id: 'def_2', type: 'def', isPlayer: false, x: 230, y: 320, angle: -155, number: '2', label: '수비 2' },
        { id: 'def_3', type: 'def', isPlayer: false, x: 370, y: 320, angle: 155, number: '3', label: '수비 3' }
      ];
    }
    if (size === 4) {
      return [
        { id: 'att_1', type: 'att', hasBall: true, x: 300, y: 470, angle: 0, number: '1', label: '탑 볼핸들러' },
        { id: 'att_2', type: 'att', hasBall: false, x: 150, y: 380, angle: 25, number: '7', label: '좌측 윙' },
        { id: 'att_3', type: 'att', hasBall: false, x: 450, y: 380, angle: -25, number: '9', label: '우측 윙' },
        { id: 'att_4', type: 'att', hasBall: false, x: 430, y: 220, angle: -80, number: '13', label: '코너/포스트' },
        { id: 'def_1', type: 'def', isPlayer: true, x: 300, y: 370, angle: 180, number: '10', label: '수비 대장' },
        { id: 'def_2', type: 'def', isPlayer: false, x: 220, y: 320, angle: -155, number: '2', label: '좌측 수비' },
        { id: 'def_3', type: 'def', isPlayer: false, x: 380, y: 320, angle: 155, number: '3', label: '우측 수비' },
        { id: 'def_4', type: 'def', isPlayer: false, x: 370, y: 200, angle: 100, number: '4', label: '골밑 수비' }
      ];
    }
    // size === 5 (정규 5대5)
    return [
      { id: 'att_1', type: 'att', hasBall: true, x: 300, y: 480, angle: 0, number: '1', label: 'PG 탑' },
      { id: 'att_2', type: 'att', hasBall: false, x: 450, y: 380, angle: -25, number: '2', label: 'SG 우측 윙' },
      { id: 'att_3', type: 'att', hasBall: false, x: 150, y: 380, angle: 25, number: '3', label: 'SF 좌측 윙' },
      { id: 'att_4', type: 'att', hasBall: false, x: 430, y: 220, angle: -80, number: '4', label: 'PF 우측 코너' },
      { id: 'att_5', type: 'att', hasBall: false, x: 170, y: 220, angle: 80, number: '5', label: 'C 좌측 포스트' },
      { id: 'def_1', type: 'def', isPlayer: true, x: 300, y: 380, angle: 180, number: '10', label: '수비 대장' },
      { id: 'def_2', type: 'def', isPlayer: false, x: 380, y: 320, angle: 155, number: '2', label: '우측 윙 수비' },
      { id: 'def_3', type: 'def', isPlayer: false, x: 220, y: 320, angle: -155, number: '3', label: '좌측 윙 수비' },
      { id: 'def_4', type: 'def', isPlayer: false, x: 360, y: 200, angle: 100, number: '4', label: '우측 포스트 수비' },
      { id: 'def_5', type: 'def', isPlayer: false, x: 240, y: 200, angle: -100, number: '5', label: '좌측 포스트 수비' }
    ];
  }

  function loadMatchSize(size) {
    currentBoardMatchSize = Math.max(1, Math.min(5, size));
    boardPlayers = getMatchPresets(currentBoardMatchSize);
    selectedPlayerId = boardPlayers[0] ? boardPlayers[0].id : null;

    if (matchCountDisplay) {
      matchCountDisplay.innerText = `${currentBoardMatchSize} vs ${currentBoardMatchSize}`;
    }
    if (matchCountMinusBtn) matchCountMinusBtn.disabled = (currentBoardMatchSize <= 1);
    if (matchCountPlusBtn) matchCountPlusBtn.disabled = (currentBoardMatchSize >= 5);

    if (matchChipsRow) {
      const chips = matchChipsRow.querySelectorAll('.match-chip');
      chips.forEach(c => {
        const sz = parseInt(c.dataset.size, 10);
        c.classList.toggle('active', sz === currentBoardMatchSize);
      });
    }

    updateSelectedPlayerToolbar();

    // 농구공 초기 소유자 동기화
    const ballHolder = boardPlayers.find(p => p.hasBall) || boardPlayers.find(p => p.type === 'att') || boardPlayers[0];
    if (ballHolder) {
      boardBall.holderId = ballHolder.id;
      boardBall.x = ballHolder.x;
      boardBall.y = ballHolder.y;
      boardPlayers.forEach(p => p.hasBall = (p.id === ballHolder.id));
    }

    renderBoard();
  }

  function updateSelectedPlayerToolbar() {
    if (boardRotationToolbar) {
      boardRotationToolbar.classList.add('hidden');
    }
  }

  function initBoardMode() {
    if (autoOpenGuideTimer) clearTimeout(autoOpenGuideTimer);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();

    // 퀴즈 전용 레이어 모두 숨김
    defenseCandidatesGroup.classList.add('hidden');
    if (attackerMarker) attackerMarker.style.display = 'none';
    defenseAxisLine.classList.remove('visible');
    otherPlayersGroup.innerHTML = '';
    feedbackToast.classList.add('hidden');
    guideModal.classList.add('hidden');
    hideCandidateTooltip();

    const bubble = document.getElementById('clickMeBubble');
    if (bubble) bubble.style.display = 'none';

    // 전술판 레이어 표시 (하단 문제/회전 카드는 코트 시야 확보를 위해 완전 삭제/숨김)
    if (boardDragLayer) boardDragLayer.classList.remove('hidden');
    if (courtBottomQuizCard) courtBottomQuizCard.classList.add('hidden');
    if (boardRotationToolbar) boardRotationToolbar.classList.add('hidden');

    if (currentQuizBadge) {
      currentQuizBadge.style.background = '#10b981';
      currentQuizBadge.innerText = '📋 자유 전술판';
    }
    if (currentQuizTitle) {
      currentQuizTitle.innerHTML = '<span class="highlight">1:1부터 5:5까지 직접 배치하고 전술을 연구해 보세요!</span>';
    }
    if (helperText) {
      helperText.innerHTML = '선수 몸통을 드래그해 이동하고, 화살표 머리를 잡고 회전하세요! <strong>농구공을 코트 어디든 자유롭게 놓거나, 선수에게 패스</strong>할 수 있습니다.';
    }

    // 기본 2대2 로드
    loadMatchSize(2);
  }

  function createBoardPlayerSvg(p, isGoodDefense) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.id = `bPlayer_${p.id}`;
    const isSelected = (p.id === selectedPlayerId);
    g.className.baseVal = `draggable-player ${p.type === 'att' ? 'player-att' : 'player-def'} ${isGoodDefense ? 'good-defense' : ''} ${isSelected ? 'selected' : ''}`;
    g.setAttribute('transform', `translate(${p.x}, ${p.y})`);
    g.dataset.id = p.id;

    const isAtt = p.type === 'att';
    const color = isAtt ? '#ef4444' : '#2563eb';
    const labelColor = isAtt ? '#b91c1c' : '#1d4ed8';

    // 각도 결정
    if (p.angle === undefined) {
      const dx = 300 - p.x;
      const dy = 78 - p.y;
      let angle = (Math.atan2(dy, dx) * 180 / Math.PI) - 90;
      if (!isAtt) angle += 180;
      p.angle = Math.round(angle);
    }

    let innerBadgeHtml = ''; // 독립된 #boardBallElement가 항상 최상단에서 농구공 렌더링

    // 마커 베이스 원 (반경 38), 큼직해진 발자국 & 앞뒤 명확한 디테일
    // [동그라미] 누르고 드래그 -> 이동만 동작
    // [화살표 머리] 누르고 드래그 -> 회전만 동작
    g.innerHTML = `
      <circle class="cand-zone-circle" cx="0" cy="0" r="38" fill="#e2e8f0" stroke="${color}" stroke-width="2.8" />
      <g class="feet-rotate-group" transform="rotate(${p.angle})">
        <!-- 앞방향 가이드 점선 -->
        <line x1="0" y1="-24" x2="0" y2="-45" stroke="${color}" stroke-width="3" stroke-dasharray="4 2" />
        
        <!-- 화살표 머리 (마우스로 누르고 돌리는 회전 손잡이) -->
        <g class="arrow-head-handle" data-action="rotate" title="화살표 머리를 누른 채 드래그하면 회전합니다">
          <!-- 넉넉한 클릭/터치 히트박스 (반경 18) -->
          <circle class="arrow-hitbox" cx="0" cy="-54" r="18" fill="rgba(0,0,0,0.001)" />
          <!-- 호버 시 보이는 은은한 가이드 링 -->
          <circle class="arrow-hover-ring" cx="0" cy="-54" r="15" fill="none" stroke="${color}" stroke-width="1.8" stroke-dasharray="3 2" opacity="0" />
          <!-- 삼각 화살표 머리 -->
          <path class="arrow-head-shape" d="M -10 -45 L 0 -63 L 10 -45 Z" fill="${color}" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round" />
          <!-- 중심 흰색 포인트 닷 -->
          <circle class="arrow-indicator-dot" cx="0" cy="-53" r="2.2" fill="#ffffff" />
        </g>

        <g transform="translate(-16, 0)"><use href="#shoeSoleLeft" fill="${color}"/></g>
        <g transform="translate(16, 0)"><use href="#shoeSoleRight" fill="${color}"/></g>
      </g>
      ${innerBadgeHtml}
    `;

    return g;
  }

  function calculateBoardState() {
    // 볼 소유자 확인 (공격수 또는 수비수 또는 독립 루즈볼)
    const ballHolder = boardBall.holderId ? boardPlayers.find(p => p.id === boardBall.holderId) : null;
    const ballAtt = (ballHolder && ballHolder.type === 'att') ? ballHolder : null;
    const ballDef = (ballHolder && ballHolder.type === 'def') ? ballHolder : null;

    // 농구공의 실시간 절대 좌표 (선수가 쥐고 있으면 선수 위치, 독립 볼이면 공 자체 좌표)
    const ballX = ballHolder ? ballHolder.x : boardBall.x;
    const ballY = ballHolder ? ballHolder.y : boardBall.y;

    const mainDef = boardPlayers.find(p => p.type === 'def' && p.isPlayer) || boardPlayers.find(p => p.type === 'def');
    let isGoodDefense = false;
    let feedbackStatus = '';

    const rimX = 300, rimY = 78;
    const dAx = ballX - rimX;
    const dAy = ballY - rimY;
    const distRimToBall = Math.hypot(dAx, dAy);

    // 농구공 앞 약 95px 지점 (골대와 공 사이, 팔 하나 거리)
    const idealDist = Math.max(50, distRimToBall - 95);
    const idealRatio = distRimToBall > 0 ? idealDist / distRimToBall : 0.8;
    const idealX = rimX + dAx * idealRatio;
    const idealY = rimY + dAy * idealRatio;

    if (boardAxisLine) {
      boardAxisLine.setAttribute('x1', rimX.toString());
      boardAxisLine.setAttribute('y1', rimY.toString());
      boardAxisLine.setAttribute('x2', ballX.toString());
      boardAxisLine.setAttribute('y2', ballY.toString());
    }
    if (idealDefenseZone) {
      idealDefenseZone.setAttribute('transform', `translate(${idealX}, ${idealY})`);
    }

    if (mainDef) {
      const distDefToBall = Math.hypot(mainDef.x - ballX, mainDef.y - ballY);
      const distDefToIdeal = Math.hypot(mainDef.x - idealX, mainDef.y - idealY);

      if (distDefToIdeal < 45) {
        isGoodDefense = true;
        feedbackStatus = '🎉 완벽한 수비 위치! (골대-공 사이 차단 + 팔 하나 거리 확보)';
      } else if (distDefToBall < 65) {
        feedbackStatus = '⚠️ 너무 바짝 붙었어요! 돌파당하기 쉬우니 팔 하나 거리(약 1m)로 물러서세요.';
      } else if (distDefToBall > 145) {
        feedbackStatus = '⚠️ 너무 멀어요! 슛을 허용하니 골대-공 사이(황금 점선)로 다가가세요.';
      } else {
        feedbackStatus = '💡 수비수를 골대와 공 사이(황금색 점선 위 녹색 원)에 놓아보세요!';
      }
    } else {
      feedbackStatus = '선수나 농구공을 코트에 자유롭게 배치해보세요!';
    }

    if (boardGuideGroup) {
      boardGuideGroup.style.display = showGuides ? 'block' : 'none';
    }

    if (currentMode === 'board') {
      if (courtBottomQuizCard) courtBottomQuizCard.classList.add('hidden');
      if (boardRotationToolbar) boardRotationToolbar.classList.add('hidden');
      if (helperText) {
        helperText.innerHTML = `<span style="color:#059669; font-weight:800;">[실시간 수비 분석]</span> ${feedbackStatus}`;
      }
    } else {
      if (courtQuizDesc) {
        courtQuizDesc.innerHTML = `<span style="color:#059669; font-weight:800;">[실시간 수비 분석]</span> ${feedbackStatus}`;
      }
    }

    return { ballAtt, mainDef, isGoodDefense };
  }

  function updateBoardPositionsOnly() {
    const { mainDef, isGoodDefense } = calculateBoardState();

    boardPlayers.forEach(p => {
      const el = document.getElementById(`bPlayer_${p.id}`);
      if (!el) return;

      el.setAttribute('transform', `translate(${p.x}, ${p.y})`);

      // 회전 각도 갱신
      const rotEl = el.querySelector('.feet-rotate-group');
      if (rotEl) {
        rotEl.setAttribute('transform', `rotate(${p.angle})`);
      }

      const isSelected = (p.id === selectedPlayerId);
      el.classList.toggle('selected', isSelected);

      if (p === mainDef) {
        el.classList.toggle('good-defense', isGoodDefense);
      } else {
        el.classList.remove('good-defense');
      }
    });

    // 농구공 위치 동기화 (마우스로 직접 공을 드래그 중이 아닐 때)
    if (!isDraggingBall && boardBallElement) {
      if (boardBall.holderId) {
        const holder = boardPlayers.find(p => p.id === boardBall.holderId);
        if (holder) {
          boardBall.x = holder.x;
          boardBall.y = holder.y;
        } else {
          boardBall.holderId = null;
        }
      }
      boardBallElement.setAttribute('transform', `translate(${boardBall.x}, ${boardBall.y})`);
      boardBallElement.style.display = (currentMode === 'board') ? 'block' : 'none';
    }

    updateSelectedPlayerToolbar();
  }

  function renderBoard() {
    if (!boardPlayersGroup) return;
    boardPlayersGroup.innerHTML = '';

    const { mainDef, isGoodDefense } = calculateBoardState();

    boardPlayers.forEach(p => {
      const el = createBoardPlayerSvg(p, isGoodDefense && p === mainDef);
      boardPlayersGroup.appendChild(el);
    });

    // 농구공 렌더링 동기화
    if (boardBallElement) {
      if (!isDraggingBall && boardBall.holderId) {
        const holder = boardPlayers.find(p => p.id === boardBall.holderId);
        if (holder) {
          boardBall.x = holder.x;
          boardBall.y = holder.y;
        } else {
          boardBall.holderId = null;
        }
      }
      boardBallElement.setAttribute('transform', `translate(${boardBall.x}, ${boardBall.y})`);
      boardBallElement.style.display = (currentMode === 'board') ? 'block' : 'none';
    }

    updateSelectedPlayerToolbar();
  }

  // 드래그 좌표 변환 유틸
  function getSvgCoordinates(evt) {
    const svg = document.getElementById('courtSvg');
    if (!svg) return { x: 300, y: 400 };
    const pt = svg.createSVGPoint();
    if (evt.touches && evt.touches.length > 0) {
      pt.x = evt.touches[0].clientX;
      pt.y = evt.touches[0].clientY;
    } else {
      pt.x = evt.clientX;
      pt.y = evt.clientY;
    }
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

  // 드래그 앤 드롭 마우스/터치 리스너 (동그라미: 위치 이동 / 화살표 머리: 각도 회전 / 농구공: 패스 이동)
  function setupBoardDragListeners() {
    const svg = document.getElementById('courtSvg');
    if (!svg) return;

    function handleStart(e) {
      if (currentMode !== 'board') return;

      // 0. 농구공을 눌렀는지 확인 (마우스로 농구공만 선택해서 다른 선수에게 이동/패스!)
      const ballHit = e.target.closest('#boardBallElement') || e.target.closest('.draggable-ball');
      if (ballHit) {
        isDraggingBall = true;
        activeDragId = null;
        isRotating = false;

        document.body.classList.add('board-ball-dragging');
        if (boardBallElement) boardBallElement.classList.add('dragging');

        const pt = getSvgCoordinates(e);
        dragStartPos = { x: pt.x, y: pt.y };

        if (e.type === 'touchstart') e.preventDefault();
        e.stopPropagation();
        return;
      }

      // 1. 화살표 머리를 눌렀는지 확인 (화살표의 머리를 마우스로 누른 상태에서만 회전!)
      const rotateHandle = e.target.closest('.arrow-head-handle');
      if (rotateHandle) {
        const playerEl = rotateHandle.closest('.draggable-player');
        if (!playerEl) return;

        activeRotateId = playerEl.dataset.id;
        selectedPlayerId = activeRotateId;
        isRotating = true;
        activeDragId = null;
        isDraggingBall = false;

        document.body.classList.add('board-rotating');
        rotateHandle.classList.add('grabbing');
        updateBoardPositionsOnly();

        if (e.type === 'touchstart') e.preventDefault();
        e.stopPropagation();
        return;
      }

      // 2. 동그라미(선수 마커 몸통)를 눌렀는지 확인 (동그라미를 누르면 이동만!)
      const target = e.target.closest('.draggable-player');
      if (!target) return;

      activeDragId = target.dataset.id;
      selectedPlayerId = activeDragId;
      isRotating = false;
      activeRotateId = null;
      isDraggingBall = false;

      const pt = getSvgCoordinates(e);
      dragStartPos = { x: pt.x, y: pt.y };
      hasMovedSignificantly = false;

      target.classList.add('dragging');
      updateBoardPositionsOnly();
      if (e.type === 'touchstart') e.preventDefault();
    }

    function handleMove(e) {
      if (currentMode !== 'board') return;

      // [0] 농구공을 마우스로 잡고 이동 중 (코트 어디든 이동 / 다른 선수에게 패스):
      if (isDraggingBall) {
        const pt = getSvgCoordinates(e);
        boardBall.x = Math.max(40, Math.min(560, Math.round(pt.x)));
        boardBall.y = Math.max(50, Math.min(690, Math.round(pt.y)));

        if (boardBallElement) {
          boardBallElement.setAttribute('transform', `translate(${boardBall.x}, ${boardBall.y})`);
        }

        // 마우스 아래 가장 가까운 선수에게 하이라이트 (선수 마커 반경 45px 이내)
        let nearest = null;
        let minDist = 45;
        boardPlayers.forEach(p => {
          const el = document.getElementById(`bPlayer_${p.id}`);
          if (el) el.classList.remove('pass-target-highlight');
          const d = Math.hypot(p.x - boardBall.x, p.y - boardBall.y);
          if (d < minDist) {
            minDist = d;
            nearest = p;
          }
        });

        if (nearest) {
          const targetEl = document.getElementById(`bPlayer_${nearest.id}`);
          if (targetEl) targetEl.classList.add('pass-target-highlight');
        }

        // 드래그 중에도 수비선과 가이드 위치를 실시간 갱신
        calculateBoardState();

        if (e.type === 'touchmove') e.preventDefault();
        return;
      }

      // [A] 화살표 머리를 누르고 회전 중:
      if (isRotating && activeRotateId) {
        const pt = getSvgCoordinates(e);
        const p = boardPlayers.find(item => item.id === activeRotateId);
        if (p) {
          const dx = pt.x - p.x;
          const dy = pt.y - p.y;
          // 선수 중심(p.x, p.y)에서 마우스 포인터 방향으로의 각도 (+90도 = 12시 방향이 0도)
          const rawAngle = (Math.atan2(dy, dx) * 180 / Math.PI) + 90;
          p.angle = Math.round((rawAngle % 360 + 360) % 360);
          p.hasCustomAngle = true;
          updateBoardPositionsOnly();
        }
        if (e.type === 'touchmove') e.preventDefault();
        return;
      }

      // [B] 동그라미(마커)를 누르고 이동 중 (이동만 되고 각도는 불변):
      if (activeDragId) {
        const pt = getSvgCoordinates(e);
        if (Math.hypot(pt.x - dragStartPos.x, pt.y - dragStartPos.y) > 4) {
          hasMovedSignificantly = true;
        }

        const p = boardPlayers.find(item => item.id === activeDragId);
        if (p) {
          p.x = Math.max(50, Math.min(550, Math.round(pt.x)));
          p.y = Math.max(60, Math.min(680, Math.round(pt.y)));
          updateBoardPositionsOnly();
        }
        if (e.type === 'touchmove') e.preventDefault();
      }
    }

    function handleEnd(e) {
      // [0] 농구공 드래그 종료 처리
      if (isDraggingBall) {
        isDraggingBall = false;
        document.body.classList.remove('board-ball-dragging');
        if (boardBallElement) boardBallElement.classList.remove('dragging');

        // 모든 패스 타깃 하이라이트 해제
        document.querySelectorAll('.pass-target-highlight').forEach(el => el.classList.remove('pass-target-highlight'));

        // 공을 놓은 위치에서 선수 마커(반경 45px 이내) 탐색
        let nearest = null;
        let minDist = 45;
        boardPlayers.forEach(p => {
          const d = Math.hypot(p.x - boardBall.x, p.y - boardBall.y);
          if (d < minDist) {
            minDist = d;
            nearest = p;
          }
        });

        if (nearest) {
          // 선수 마커 위에 놓았을 때: 그 선수가 공을 쥐게 됨!
          boardBall.holderId = nearest.id;
          boardBall.x = nearest.x;
          boardBall.y = nearest.y;
          boardPlayers.forEach(p => {
            p.hasBall = (p.id === nearest.id);
          });
          selectedPlayerId = nearest.id;
          sfx.playClick();
        } else {
          // ★ 선수가 없는 코트 빈 공간에 놓았을 때:
          // 기존 선수에게 되돌아가지 않고, 놓은 그 자리에 독립적인 공으로 그대로 머뭄!
          boardBall.holderId = null;
          boardPlayers.forEach(p => {
            p.hasBall = false;
          });
          sfx.playClick();
        }

        updateBoardPositionsOnly();
        renderBoard();
        return;
      }

      // 회전 종료
      if (isRotating) {
        isRotating = false;
        activeRotateId = null;
        document.body.classList.remove('board-rotating');
        document.querySelectorAll('.arrow-head-handle.grabbing').forEach(el => el.classList.remove('grabbing'));
        updateBoardPositionsOnly();
      }

      // 이동 종료
      if (activeDragId) {
        const el = document.getElementById(`bPlayer_${activeDragId}`);
        if (el) el.classList.remove('dragging');

        activeDragId = null;
        hasMovedSignificantly = false;
        updateBoardPositionsOnly();
      }
    }

    svg.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    svg.addEventListener('touchstart', handleStart, { passive: false });
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
    window.addEventListener('touchcancel', handleEnd);

    // 마우스 휠 미세 회전 (보조 편의 기능)
    svg.addEventListener('wheel', (e) => {
      if (currentMode !== 'board') return;
      const target = e.target.closest('.draggable-player');
      const targetId = target ? target.dataset.id : selectedPlayerId;
      if (!targetId) return;

      const p = boardPlayers.find(item => item.id === targetId);
      if (p) {
        e.preventDefault();
        selectedPlayerId = targetId;
        const delta = e.deltaY > 0 ? 15 : -15;
        p.angle = ((p.angle || 0) + delta + 360) % 360;
        p.hasCustomAngle = true;
        updateBoardPositionsOnly();
      }
    }, { passive: false });
  }

  // 툴바 버튼 이벤트 바인딩
  if (matchCountMinusBtn) {
    matchCountMinusBtn.addEventListener('click', () => {
      sfx.playClick();
      if (currentBoardMatchSize > 1) {
        loadMatchSize(currentBoardMatchSize - 1);
      }
    });
  }

  if (matchCountPlusBtn) {
    matchCountPlusBtn.addEventListener('click', () => {
      sfx.playClick();
      if (currentBoardMatchSize < 5) {
        loadMatchSize(currentBoardMatchSize + 1);
      }
    });
  }

  if (matchChipsRow) {
    const chips = matchChipsRow.querySelectorAll('.match-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        sfx.playClick();
        const sz = parseInt(chip.dataset.size, 10);
        if (sz >= 1 && sz <= 5) {
          loadMatchSize(sz);
        }
      });
    });
  }

  if (addAttackerBtn) {
    addAttackerBtn.addEventListener('click', () => {
      sfx.playClick();
      const attCount = boardPlayers.filter(p => p.type === 'att').length + 1;
      const newAtt = {
        id: `att_${Date.now()}`,
        type: 'att',
        hasBall: false,
        x: 200 + Math.floor(Math.random() * 200),
        y: 350 + Math.floor(Math.random() * 150),
        number: attCount.toString(),
        label: `공격수 ${attCount}`,
        angle: 0
      };
      boardPlayers.push(newAtt);
      selectedPlayerId = newAtt.id;
      renderBoard();
    });
  }

  if (addDefenderBtn) {
    addDefenderBtn.addEventListener('click', () => {
      sfx.playClick();
      const defCount = boardPlayers.filter(p => p.type === 'def').length + 1;
      const newDef = {
        id: `def_${Date.now()}`,
        type: 'def',
        isPlayer: false,
        x: 220 + Math.floor(Math.random() * 160),
        y: 250 + Math.floor(Math.random() * 150),
        number: defCount.toString(),
        label: `수비수 ${defCount}`,
        angle: 180
      };
      boardPlayers.push(newDef);
      selectedPlayerId = newDef.id;
      renderBoard();
    });
  }

  if (clearBoardBtn) {
    clearBoardBtn.addEventListener('click', () => {
      sfx.playClick();
      loadMatchSize(1);
    });
  }

  if (toggleGuideLines) {
    toggleGuideLines.addEventListener('change', (e) => {
      showGuides = e.target.checked;
      renderBoard();
    });
  }

  // 발자국 회전 버튼 이벤트 바인딩
  if (rotateLeftBtn) {
    rotateLeftBtn.addEventListener('click', () => {
      sfx.playClick();
      const p = boardPlayers.find(item => item.id === selectedPlayerId) || boardPlayers[0];
      if (p) {
        p.angle = ((p.angle || 0) - 30 + 360) % 360;
        p.hasCustomAngle = true;
        updateBoardPositionsOnly();
      }
    });
  }

  if (rotateRightBtn) {
    rotateRightBtn.addEventListener('click', () => {
      sfx.playClick();
      const p = boardPlayers.find(item => item.id === selectedPlayerId) || boardPlayers[0];
      if (p) {
        p.angle = ((p.angle || 0) + 30) % 360;
        p.hasCustomAngle = true;
        updateBoardPositionsOnly();
      }
    });
  }

  if (rotateFaceRimBtn) {
    rotateFaceRimBtn.addEventListener('click', () => {
      sfx.playClick();
      const p = boardPlayers.find(item => item.id === selectedPlayerId) || boardPlayers[0];
      if (p) {
        const dx = 300 - p.x;
        const dy = 78 - p.y;
        let angle = (Math.atan2(dy, dx) * 180 / Math.PI) - 90;
        if (p.type !== 'att') angle += 180;
        p.angle = Math.round(angle);
        p.hasCustomAngle = false;
        updateBoardPositionsOnly();
      }
    });
  }

  setupBoardDragListeners();

  // ================= 6. 다른 동료 선수들 SVG 렌더링 =================
  function renderOtherPlayers(players) {
    otherPlayersGroup.innerHTML = '';
    if (!players || players.length === 0) return;

    players.forEach(p => {
      const isAtt = (p.type === 'att');
      const color = isAtt ? '#ef4444' : '#2563eb';
      const labelBg = isAtt ? '#b91c1c' : '#1d4ed8';

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'teammate-marker');
      g.setAttribute('transform', `translate(${p.x}, ${p.y})`);

      // 1. 회색 바탕 동그라미 베이스 (도형만 컴팩트하게 축소: r: 23)
      const baseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      baseCircle.setAttribute('cx', '0');
      baseCircle.setAttribute('cy', '0');
      baseCircle.setAttribute('r', '23');
      baseCircle.setAttribute('fill', '#e2e8f0');
      baseCircle.setAttribute('stroke', '#94a3b8');
      baseCircle.setAttribute('stroke-width', '2');
      g.appendChild(baseCircle);

      // 2. 발자국 2개 (도형만 축소: scale 0.62)
      const feetG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      feetG.setAttribute('transform', `rotate(${p.angle || 0})`);

      // 앞방향 가이드 점선 화살표
      const dirLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      dirLine.setAttribute('x1', '0');
      dirLine.setAttribute('y1', '-14');
      dirLine.setAttribute('x2', '0');
      dirLine.setAttribute('y2', '-28');
      dirLine.setAttribute('stroke', color);
      dirLine.setAttribute('stroke-width', '2.5');
      dirLine.setAttribute('stroke-dasharray', '3 2');
      dirLine.setAttribute('marker-end', `url(${isAtt ? '#dirArrowRed' : '#dirArrowBlue'})`);
      feetG.appendChild(dirLine);

      // 발자국 (도형만 축소하여 23px 원 안에 쏙 들어가게)
      const leftFoot = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      leftFoot.setAttribute('href', '#shoeSoleLeft');
      leftFoot.setAttribute('fill', color);
      leftFoot.setAttribute('transform', 'translate(-9, 0) scale(0.62)');

      const rightFoot = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      rightFoot.setAttribute('href', '#shoeSoleRight');
      rightFoot.setAttribute('fill', color);
      rightFoot.setAttribute('transform', 'translate(9, 0) scale(0.62)');

      feetG.appendChild(leftFoot);
      feetG.appendChild(rightFoot);
      g.appendChild(feetG);

      // 3. 미니 이름 태그 (글씨는 다시 큼직하고 또렷하게 복원! 11.5px bold)
      const tagG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      tagG.setAttribute('transform', 'translate(0, 25)');

      const nameLen = p.name ? p.name.length : 4;
      const tagWidth = Math.max(68, nameLen * 11.5 + 16);

      const tagRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      tagRect.setAttribute('x', (-tagWidth / 2).toString());
      tagRect.setAttribute('y', '0');
      tagRect.setAttribute('width', tagWidth.toString());
      tagRect.setAttribute('height', '20');
      tagRect.setAttribute('rx', '10');
      tagRect.setAttribute('fill', labelBg);
      tagRect.setAttribute('stroke', '#ffffff');
      tagRect.setAttribute('stroke-width', '1.2');
      tagG.appendChild(tagRect);

      const tagText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      tagText.setAttribute('x', '0');
      tagText.setAttribute('y', '14');
      tagText.setAttribute('text-anchor', 'middle');
      tagText.setAttribute('fill', '#ffffff');
      tagText.setAttribute('font-size', '11.5');
      tagText.setAttribute('font-weight', 'bold');
      tagText.setAttribute('font-family', "'Noto Sans KR'");
      tagText.textContent = p.name;
      tagG.appendChild(tagText);

      g.appendChild(tagG);
      otherPlayersGroup.appendChild(g);
    });
  }

  // ================= 7. 특정 퀴즈 로드 및 SVG 배치 =================
  function loadQuiz(index) {
    if (autoOpenGuideTimer) clearTimeout(autoOpenGuideTimer);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();

    currentQuizIndex = index;
    currentStep = 'init';
    const qList = modeData[currentMode];
    const q = qList[currentQuizIndex];

    // 동료 선수들 렌더링
    renderOtherPlayers(q.otherPlayers);

    // 공격자 마커 위치 및 빨간색 발자국 각도 (외부 scale 제거로 글씨 크기 100% 선명하게 유지)
    attackerMarker.setAttribute('transform', `translate(${q.attacker.x}, ${q.attacker.y})`);
    if (attackerFeetGroup) {
      attackerFeetGroup.setAttribute('transform', `rotate(${q.attacker.angle || 0})`);
    }
    attackerLabelText.textContent = q.attacker.label;
    const aLabelRect = document.getElementById('attackerLabelRect');
    if (aLabelRect) {
      const aLen = q.attacker.label ? q.attacker.label.length : 6;
      const aWidth = Math.max(96, aLen * 12 + 20);
      aLabelRect.setAttribute('width', aWidth.toString());
      aLabelRect.setAttribute('x', (-aWidth / 2).toString());
    }

    // 가상 축선 설정
    defenseAxisLine.setAttribute('x1', '300');
    defenseAxisLine.setAttribute('y1', '78');
    defenseAxisLine.setAttribute('x2', q.axisTarget.x.toString());
    defenseAxisLine.setAttribute('y2', q.axisTarget.y.toString());
    defenseAxisLine.classList.remove('visible');

    // 수비 후보 마커 A, B, C 발자국 위치 & 각도 설정
    ['A', 'B', 'C'].forEach(key => {
      const choiceData = q.choices[key];
      const markerEl = document.getElementById(`candidate${key}`);
      const rotEl = document.getElementById(`candRot${key}`);

      if (markerEl && choiceData) {
        markerEl.setAttribute('transform', `translate(${choiceData.x}, ${choiceData.y})`);
        markerEl.classList.remove('highlight-correct');
      }
      if (rotEl && choiceData) {
        rotEl.setAttribute('transform', `rotate(${choiceData.angle || 180})`);
      }
    });

    hideCandidateTooltip();

    // UI 리셋
    defenseCandidatesGroup.classList.add('hidden');
    if (courtBottomQuizCard) courtBottomQuizCard.classList.add('hidden');
    feedbackToast.classList.add('hidden');
    guideModal.classList.add('hidden');

    const bubble = document.getElementById('clickMeBubble');
    if (bubble) bubble.style.display = 'block';

    const modeNames = { '1v1': '1대1', '2v2': '2대2', '3v3': '3대3', '5v5': '5대5' };
    if (instructionBanner) instructionBanner.classList.remove('quiz-active');
    if (currentQuizBadge) {
      currentQuizBadge.style.background = '#ea580c';
      currentQuizBadge.innerText = `${modeNames[currentMode]} - Q${q.id}`;
    }
    if (currentQuizTitle) {
      currentQuizTitle.innerHTML = `<span class="highlight">${q.title}</span>`;
    }

    if (helperText) {
      helperText.innerHTML = `${q.situationDesc} 아래 <strong>빨간색 공격자</strong>를 눌러 퀴즈를 시작하세요!`;
    }

    updateNavState();
  }

  // ================= 8. 퀴즈 시작 =================
  attackerMarker.addEventListener('click', () => {
    sfx.playClick();
    startQuiz();
  });

  function startQuiz() {
    currentStep = 'quiz';
    const qList = modeData[currentMode];
    const q = qList[currentQuizIndex];

    const bubble = document.getElementById('clickMeBubble');
    if (bubble) bubble.style.display = 'none';

    defenseCandidatesGroup.classList.remove('hidden');
    defenseAxisLine.classList.add('visible');

    const modeNames = { '1v1': '1대1', '2v2': '2대2', '3v3': '3대3', '5v5': '5대5' };

    // ★ 단일 카드로 완벽 통합! 중복 제거 & 질문 강조
    if (instructionBanner) instructionBanner.classList.add('quiz-active');
    if (currentQuizBadge) {
      currentQuizBadge.style.background = '#2563eb';
      currentQuizBadge.innerText = `${modeNames[currentMode]} - Q${q.id}`;
    }
    if (currentQuizTitle) {
      currentQuizTitle.innerHTML = `${q.title}: <strong>어디에 발을 딛고 서야 할까요?</strong> <span class="highlight">(A, B, C 중 선택)</span>`;
    }
    if (helperText) {
      helperText.innerHTML = `${q.situationDesc} 가장 효과적인 <strong>보라색 발자국(A, B, C)</strong> 중 하나를 골라보세요!`;
    }
  }

  // ================= 9. 최상단 단일 툴팁 & 선택지 클릭 (A, B, C) =================
  function showCandidateTooltip(choiceKey) {
    if (!topTooltipLayer || !topTooltipBg || !topTooltipText || !topTooltipArrow) return;
    const qList = modeData[currentMode];
    const q = qList[currentQuizIndex];
    if (!q || !q.choices || !q.choices[choiceKey]) return;

    const choiceData = q.choices[choiceKey];
    const labelText = choiceData.label || '';
    topTooltipText.textContent = labelText;

    // 16px 폰트에 맞춘 넉넉하고 시원한 박스 너비 계산
    const boxWidth = Math.max(115, labelText.length * 15.5 + 32);
    topTooltipBg.setAttribute('width', boxWidth);
    topTooltipBg.setAttribute('height', '36');
    topTooltipBg.setAttribute('y', '-18');
    topTooltipBg.setAttribute('rx', '18');
    topTooltipText.setAttribute('x', (boxWidth / 2).toString());
    topTooltipText.setAttribute('y', '5.5');

    // 마커가 코트 우측(x >= 330)에 있으면 툴팁을 마커 왼쪽에 띄워 오른쪽에 위치한 마커/공격수에 가려지지 않음!
    const tipOffset = 38;
    if (choiceData.x >= 330) {
      topTooltipLayer.setAttribute('transform', `translate(${choiceData.x - boxWidth - tipOffset}, ${choiceData.y})`);
      topTooltipArrow.setAttribute('points', `${boxWidth},-7 ${boxWidth},7 ${boxWidth + 8},0`);
    } else {
      topTooltipLayer.setAttribute('transform', `translate(${choiceData.x + tipOffset}, ${choiceData.y})`);
      topTooltipArrow.setAttribute('points', '-8,0 0,-7 0,7');
    }

    // 항상 어떤 마커나 그래픽보다도 최상단에 노출
    topTooltipLayer.style.opacity = '1';
  }

  function hideCandidateTooltip() {
    if (topTooltipLayer) {
      topTooltipLayer.style.opacity = '0';
    }
  }

  document.querySelectorAll('.candidate-marker').forEach(marker => {
    const choice = marker.getAttribute('data-choice');
    marker.addEventListener('mouseenter', () => {
      showCandidateTooltip(choice);
    });
    marker.addEventListener('mouseleave', () => {
      hideCandidateTooltip();
    });
    marker.addEventListener('click', () => {
      hideCandidateTooltip();
      handleQuizAnswer(choice);
    });
  });

  function handleQuizAnswer(choice) {
    if (currentStep === 'feedback') return;
    currentStep = 'feedback';

    hideCandidateTooltip();
    if (autoOpenGuideTimer) clearTimeout(autoOpenGuideTimer);
    if (courtBottomQuizCard) courtBottomQuizCard.classList.add('hidden');

    const qList = modeData[currentMode];
    const q = qList[currentQuizIndex];
    const selected = q.choices[choice];

    // 정답 발자국 하이라이트
    const correctMarker = document.getElementById(`candidate${q.correctChoice}`);
    if (correctMarker) correctMarker.classList.add('highlight-correct');

    if (selected.isCorrect) {
      sfx.playCorrect();
      confetti.burst();
      solvedQuizzes[currentMode].add(q.id);
      updateNavState();

      feedbackToast.className = 'feedback-toast';
      feedbackIcon.innerText = '🎉';
      feedbackTitle.innerText = selected.feedbackTitle;
      feedbackDesc.innerText = selected.feedbackDesc;
      feedbackToast.classList.remove('hidden');

      if (currentQuizBadge) {
        currentQuizBadge.style.background = '#10b981';
        currentQuizBadge.innerText = '정답! 🎉';
      }
      if (currentQuizTitle) {
        currentQuizTitle.innerHTML = '수비 성공! 👏';
      }
      if (helperText) {
        helperText.innerHTML = `대단해요! 멋진 팀 수비 위치를 찾았어요. (${solvedQuizzes[currentMode].size}/${qList.length}개 완료)`;
      }
    } else {
      sfx.playWrong();

      feedbackToast.className = 'feedback-toast wrong';
      feedbackIcon.innerText = '⚠️';
      feedbackTitle.innerText = selected.feedbackTitle;
      feedbackDesc.innerText = selected.feedbackDesc;
      feedbackToast.classList.remove('hidden');

      if (currentQuizBadge) {
        currentQuizBadge.style.background = '#ef4444';
        currentQuizBadge.innerText = '오답 💡';
      }
      if (currentQuizTitle) {
        currentQuizTitle.innerHTML = '수비 피드백';
      }
      if (helperText) {
        helperText.innerHTML = '아쉬워요! 올바른 발 모양과 팀 수비 원리를 확인해 볼까요?';
      }
    }

    autoOpenGuideTimer = setTimeout(() => {
      feedbackToast.classList.add('hidden');
      openGuideModal();
    }, 1400);
  }

  // ================= 10. 상세 가이드 모달 & 전술 해설 시스템 =================
  function getTacticsExplanation(q) {
    const title = q.title || '';
    const desc = q.situationDesc ? q.situationDesc.replace(/<[^>]*>/g, '') : '';
    const locTip = q.locationTipDesc || '';
    const locTitle = q.locationTipTitle || '';

    // 1. 포스트업 (로우 포스트 / 골밑 / Back to Basket)
    if (title.includes('포스트') || title.includes('골밑') || title.includes('Post')) {
      return {
        conceptTitle: '로우 포스트업(Post-Up)이란?',
        conceptDesc: '공격수가 골대를 등진 채(Back to the Basket) 몸으로 수비수를 밀어붙이며 골밑으로 파고들어 훅슛이나 터닝슛을 노리는 정통 빅맨 공격 기술이에요!',
        dangerPoint: '골대 바로 앞이라 성공률이 60~70%에 달하며, 상대 페이크에 속아 성급히 점프하면 바스켓카운트(앤드원) 파울을 범해요.',
        defenseTitle: '골대 앞 철벽 앵커 수비 비법',
        defenseDesc: locTip || '골대와 공격수를 잇는 일직선 상에서 팔 하나 거리를 지키고, 무릎을 낮추어 벽처럼 버텨야 해요!',
        secretPoint: '골대-공격수 사이 차단 + 어깨너비 1.5배 지지 + 두 손 수직 거상(수직의 원칙)!'
      };
    }
    // 2. 픽앤롤 (Pick & Roll / 스크린)
    if (title.includes('픽앤롤') || title.includes('스크린') || title.includes('Pick')) {
      return {
        conceptTitle: '픽앤롤(Pick & Roll) 2인 전술이란?',
        conceptDesc: '스크리너(동료)가 수비수의 길을 가로막아(Pick) 드리블러에게 돌파 길을 열어주고, 수비가 무너지면 골밑으로 재빨리 파고들어(Roll) 득점하는 농구 최고의 콤비네이션 공격이에요!',
        dangerPoint: '스크린에 걸려 수비자가 멈칫하면 공격자 2명 모두에게 슛과 골밑 덩크를 동시에 열어주게 돼요.',
        defenseTitle: '픽앤롤 소통 & 스위치/파이트스루 비법',
        defenseDesc: locTip || '스크리너가 다가오는 것을 팀원이 큰 소리로 외쳐주고(콜 플레이), 빠른 스위치나 스크린 밑으로 파고들어야 해요!',
        secretPoint: '"스크린 우측!" 외치기 + 적극적인 스위치 수비 또는 슬라이드 스루!'
      };
    }
    // 3. 기브앤고 (Give & Go)
    if (title.includes('기브앤고') || title.includes('Give')) {
      return {
        conceptTitle: '기브앤고(Give & Go) 2인 속공이란?',
        conceptDesc: '동료에게 패스를 건넨 뒤(Give), 방심한 수비수를 따돌리고 빈 골밑으로 번개처럼 쇄도하여(Go) 다시 받아 넣는 2인 공격의 기본이에요!',
        dangerPoint: '공만 쳐다보고 사람(공격수)을 놓치면 뒤통수로 노마크 골밑 프리 슛을 내줘요.',
        defenseTitle: '패서 주시 & 몸으로 진로 차단(디나이)',
        defenseDesc: locTip || '패스를 건넨 선수가 골밑으로 뛰지 못하게 몸으로 길목을 막아서며(Bumping) 패스 길을 끊어내야 해요!',
        secretPoint: '공만 보지 말고 사람(패서) 몸을 마크하기 + 커팅 진로 범핑(Bumping)!'
      };
    }
    // 4. 백도어 컷 (Backdoor Cut)
    if (title.includes('백도어') || title.includes('Backdoor')) {
      return {
        conceptTitle: '백도어 컷(Backdoor Cut)이란?',
        conceptDesc: '수비수가 패스를 뺏으려고 너무 앞쪽으로 바짝 덤빌 때, 수비수의 등 뒤(Backdoor) 빈 공간으로 순간적으로 파고들어 쉬운 득점을 노리는 기습 전술이에요!',
        dangerPoint: '앞만 보다가 등 뒤가 뻥 뚫려 노마크 레이업을 그대로 헌납해요.',
        defenseTitle: '골대 쪽 뒷공간 확보 & 시선 분산',
        defenseDesc: locTip || '공과 사람을 삼각형으로 동시에 시야에 담고, 절대 등 뒤 공간을 허용하지 마세요!',
        secretPoint: '공과 공격자를 한눈에 보는 볼-맨(Ball-Man) 삼각 시야 유지!'
      };
    }
    // 5. 윙 45도 (Wing)
    if (title.includes('윙') || title.includes('45도') || title.includes('Wing')) {
      return {
        conceptTitle: '윙 45도(Wing) 지역 공격의 특징',
        conceptDesc: '코트에서 가장 시야가 넓고 슛과 드라이브인 성공률이 고루 높은 에이스들의 주 득점 무대예요!',
        dangerPoint: '가장 위험한 코트 중앙(골밑)으로 돌파를 허용하면 골밑슛이나 킥아웃 패스를 내주게 돼요.',
        defenseTitle: '중앙 길목 차단 & 사이드 유도 비법',
        defenseDesc: locTip || '중앙 쪽 발을 앞에 두고 비스듬한 스탠스를 취해 공격수를 사이드라인으로 몰아내세요!',
        secretPoint: '가운데 발을 앞에 둔 대각선 스탠스 + 골밑 진로 봉쇄!'
      };
    }
    // 6. 코너 3점 (Corner)
    if (title.includes('코너') || title.includes('Corner')) {
      return {
        conceptTitle: '코너(Corner) 3점슛의 비밀과 특징',
        conceptDesc: '코너는 골대와의 거리가 약 6.7m로 다른 3점 라인(7.24m)보다 50cm 이상 가까워 성공률이 매우 높은 슛 명당이에요!',
        dangerPoint: '오픈 찬스를 주면 3점슛이 들어가고, 베이스라인을 열어주면 손쉬운 리버스 레이업을 허용해요.',
        defenseTitle: '베이스라인 봉쇄 & 코너 트랩 비법',
        defenseDesc: locTip || '베이스라인 쪽 발을 깊게 디뎌 림으로 파고드는 가장 빠른 지름길을 차단하세요!',
        secretPoint: '엔드라인 쪽 발을 닫고, 뒤와 옆의 아웃라인을 제6의 수비수로 삼기!'
      };
    }
    // 7. 정면 3점 (Top)
    if (title.includes('정면') || title.includes('탑') || title.includes('Top')) {
      return {
        conceptTitle: '탑(Top) 정면 공격이란?',
        conceptDesc: '포인트가드가 코트 전체를 지휘하며 좌우 어디로든 슛과 패스, 돌파를 전개할 수 있는 전술의 사령탑 구역이에요!',
        dangerPoint: '정면에서는 공격수가 좌우 양방향 어디로든 뚫고 갈 수 있어 중심이 한쪽으로 쏠리면 위험해요.',
        defenseTitle: '정면 차단 & 팔 하나 거리 유지',
        defenseDesc: locTip || '두 발을 어깨너비보다 1.5배 넓게 벌리고, 공격수를 정면으로 마주보며 양손을 활짝 펼치세요!',
        secretPoint: '골대-공격수 일직선 차단 + 시선은 상대 배꼽에 고정!'
      };
    }
    // 8. 엘보우 / 자유투 (Elbow / High Post)
    if (title.includes('엘보우') || title.includes('하이') || title.includes('자유투') || title.includes('Elbow')) {
      return {
        conceptTitle: '엘보우 & 하이포스트 공격이란?',
        conceptDesc: '자유투 라인의 모서리에서 점프슛을 쏘거나, 골밑으로 쇄도하는 동료에게 킬패스를 찔러주는 핵심 거점 플레이예요!',
        dangerPoint: '돌파와 점퍼, 안쪽 패스가 모두 가능한 링커 자리라 수비 반응이 늦으면 순식간에 실점해요.',
        defenseTitle: '패스 길 차단 & 점퍼 방어 비법',
        defenseDesc: locTip || '골대 쪽 진입로를 몸으로 막고, 한 손은 슛 방어, 한 손은 골밑 패스 길을 견제하세요!',
        secretPoint: '팔 하나 거리 유지 + 하이핸드로 시야 가리기 & 로우핸드로 패스 견제!'
      };
    }
    // 9. 미들레인지 (Mid-Range)
    if (title.includes('미들') || title.includes('Mid-Range')) {
      return {
        conceptTitle: '미들레인지(Mid-Range) 점퍼의 특징',
        conceptDesc: '3점 라인과 골밑 사이의 2점슛 구역으로, 슛 정확도가 높고 수비가 한 발만 늦어도 클린 슛이 들어가는 구간이에요!',
        dangerPoint: '상대의 슛 페이크(속임수)에 속아 펄쩍 뛰어오르면 중심을 잃고 드라이브인을 허용해요.',
        defenseTitle: '페이크 침착 대응 & 하이핸드 비법',
        defenseDesc: locTip || '발은 바닥에 단단히 붙인 채, 상대 슛 페이크에 뜨지 않고 하이핸드로 시야만 가려주세요!',
        secretPoint: '두 발은 땅에 단단히 고정! 점프하지 말고 한 손만 번쩍 들어 슛 각도 좁히기!'
      };
    }
    // 10. 속공 (Fast Break)
    if (title.includes('속공') || title.includes('Fast Break')) {
      return {
        conceptTitle: '속공(Fast Break) 공격이란?',
        conceptDesc: '수비가 정비되기 전 3~5초 만에 빠른 드리블과 롱패스로 수적 우위를 만들어 점수를 뽑아내는 스피드 공격이에요!',
        dangerPoint: '수비수가 덤비면 바로 2:1 아웃넘버 상황이 되어 100% 슛을 줘요.',
        defenseTitle: '백코트 지연(Delay) & 골밑 수호',
        defenseDesc: locTip || '무리하게 덤비지 않고 골대 쪽으로 물러서면서 상대 속도를 늦추고 동료 복귀 시간을 벌어야 해요!',
        secretPoint: '절대 먼저 덤비지 않기! 골대 방향으로 뒷걸음질(백페달)치며 상대 스피드 줄이기!'
      };
    }
    // 11. 지역 방어 (Zone Defense)
    if (title.includes('지역') || title.includes('존') || title.includes('Zone')) {
      return {
        conceptTitle: '지역 방어(Zone Defense)의 원리',
        conceptDesc: '사람을 1:1로 쫓아다니지 않고, 2-3 또는 3-2 형태로 각자의 수비 구역을 분담해 골밑 페인트존을 철통같이 방어하는 팀 전술이에요!',
        dangerPoint: '공이 이동할 때 수비수들이 동시에 함께 움직이지 않으면 외곽 3점슛이 열려요.',
        defenseTitle: '팀 수비 쉬프트 & 리바운드 박스아웃',
        defenseDesc: locTip || '공이 있는 쪽으로 모든 수비수가 한 발씩 이동(Shift)하고, 슈터에게 빠르게 컨테스트하세요!',
        secretPoint: '공 방향으로 팀 전체가 한 몸처럼 움직이기 + 골밑 박스아웃 철저!'
      };
    }

    // 기본 폴백
    return {
      conceptTitle: `${q.title} 공격 개념`,
      conceptDesc: desc || `${q.title} 구역에서 공격수가 슛과 패스, 돌파 기회를 노리는 상황이에요!`,
      dangerPoint: '공격수에게 완벽한 오픈 찬스를 허용하면 손쉽게 실점할 수 있어요.',
      defenseTitle: locTitle || '완벽 수비 명당 비법',
      defenseDesc: locTip || '골대와 공격수를 잇는 일직선 상에서 팔 하나 거리를 지키고, 중심을 낮추어 수비하세요!',
      secretPoint: '골대와 공격수 사이 차단 + 팔 하나 거리(약 1m) 확보!'
    };
  }

  // 상단 탭 전환 이벤트 리스너 바인딩
  if (viewTacticsTabBtn && viewStanceTabBtn) {
    viewTacticsTabBtn.addEventListener('click', () => {
      sfx.playClick();
      viewTacticsTabBtn.classList.add('active');
      viewStanceTabBtn.classList.remove('active');
      if (modalTacticsView) modalTacticsView.classList.remove('hidden');
      if (modalStanceView) modalStanceView.classList.add('hidden');
    });

    viewStanceTabBtn.addEventListener('click', () => {
      sfx.playClick();
      viewStanceTabBtn.classList.add('active');
      viewTacticsTabBtn.classList.remove('active');
      if (modalTacticsView) modalTacticsView.classList.add('hidden');
      if (modalStanceView) modalStanceView.classList.remove('hidden');
    });
  }

  function openGuideModal() {
    currentStep = 'guide';
    const qList = modeData[currentMode];
    const q = qList[currentQuizIndex];
    if (!q) return;

    // 기본 화면은 항상 문제 맞춤형 전술 해설 뷰로 초기화
    if (viewTacticsTabBtn) viewTacticsTabBtn.classList.add('active');
    if (viewStanceTabBtn) viewStanceTabBtn.classList.remove('active');
    if (modalTacticsView) modalTacticsView.classList.remove('hidden');
    if (modalStanceView) modalStanceView.classList.add('hidden');

    const tactics = getTacticsExplanation(q);

    const modeNames = { '1v1': '1대1 기초', '2v2': '2대2 팀워크', '3v3': '3대3 반코트', '5v5': '5대5 정규전' };
    if (modalTag) modalTag.innerText = `🏀 [${modeNames[currentMode]}] Q${q.id} 핵심 전술 비법`;
    if (modalMainTitle) modalMainTitle.innerText = `${q.title}: 전술 해설`;
    if (modalSubtitle) modalSubtitle.innerText = q.locationTipTitle || '공격 전술 개념과 수비 명당 비법을 한눈에 배워보세요!';

    // 전술 해설 카드 내용 동적 바인딩
    if (tacticsConceptTitle) tacticsConceptTitle.innerText = tactics.conceptTitle;
    if (tacticsConceptDesc) tacticsConceptDesc.innerText = tactics.conceptDesc;
    if (tacticsDangerPoint) tacticsDangerPoint.innerHTML = `<strong>위험 포인트:</strong> ${tactics.dangerPoint}`;

    if (tacticsDefenseTitle) tacticsDefenseTitle.innerText = tactics.defenseTitle;
    if (tacticsDefenseDesc) tacticsDefenseDesc.innerText = tactics.defenseDesc;
    if (tacticsSecretPoint) tacticsSecretPoint.innerHTML = `<strong>명당 수비 공식:</strong> ${tactics.secretPoint}`;

    if (currentQuizIndex < qList.length - 1) {
      modalActionBtnText.innerText = `다음 문제 (${currentQuizIndex + 2}번) 풀기 ➔`;
    } else {
      modalActionBtnText.innerText = "이 모드 최종 결과 보기 🏆";
    }

    guideModal.classList.remove('hidden');
  }

  function closeGuideModal() {
    guideModal.classList.add('hidden');
  }

  closeModalBtn.addEventListener('click', () => {
    sfx.playClick();
    closeGuideModal();
  });

  guideModal.addEventListener('click', (e) => {
    if (e.target === guideModal) closeGuideModal();
  });

  nextOrRetryBtn.addEventListener('click', () => {
    sfx.playClick();
    closeGuideModal();

    const qList = modeData[currentMode];
    if (currentQuizIndex < qList.length - 1) {
      loadQuiz(currentQuizIndex + 1);
    } else {
      showClearModal();
    }
  });

  function showClearModal() {
    const qList = modeData[currentMode];
    const modeNames = { '1v1': '1대1 기초', '2v2': '2대2 팀워크', '3v3': '3대3 반코트', '5v5': '5대5 정규전' };
    clearModalTitle.innerText = `축하합니다! ${modeNames[currentMode]} 마스터!`;
    clearModalSub.innerText = `${modeNames[currentMode]} 모드의 모든 수비 비법을 정복했어요!`;
    finalScoreText.innerText = `${solvedQuizzes[currentMode].size} / ${qList.length}`;
    clearModalPraise.innerText = `${modeNames[currentMode]} 전술의 수비 대장 등극! 🛡️`;
    clearModal.classList.remove('hidden');
    confetti.burst();
    sfx.playCorrect();
  }

  replayAllBtn.addEventListener('click', () => {
    sfx.playClick();
    clearModal.classList.add('hidden');
    solvedQuizzes[currentMode].clear();
    loadQuiz(0);
  });

  // ================= 11. 네비게이션 버튼 =================
  prevQuizBtn.addEventListener('click', () => {
    if (currentQuizIndex > 0) {
      sfx.playClick();
      loadQuiz(currentQuizIndex - 1);
    }
  });

  nextQuizBtn.addEventListener('click', () => {
    const qList = modeData[currentMode];
    if (currentQuizIndex < qList.length - 1) {
      sfx.playClick();
      loadQuiz(currentQuizIndex + 1);
    }
  });

  if (resetAppBtn) {
    resetAppBtn.addEventListener('click', () => {
      sfx.playClick();
      solvedQuizzes[currentMode].clear();
      loadQuiz(0);
    });
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        soundToggleBtn.classList.remove('muted');
        soundToggleBtn.innerHTML = '<span class="icon">🔊</span> <span class="label">소리 켜짐</span>';
        sfx.playClick();
      } else {
        soundToggleBtn.classList.add('muted');
        soundToggleBtn.innerHTML = '<span class="icon">🔇</span> <span class="label">소리 꺼짐</span>';
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      }
    });
  }

  // 상단 수비 / 공격 모드 버튼 (기능은 추후 추가 예정)
  if (defenseModeBtn) {
    defenseModeBtn.addEventListener('click', () => {
      sfx.playClick();
      defenseModeBtn.classList.add('active');
      if (offenseModeBtn) offenseModeBtn.classList.remove('active');
      if (feedbackToast && feedbackTitle && feedbackDesc) {
        feedbackIcon.textContent = '🛡️';
        feedbackTitle.textContent = '수비 훈련 모드';
        feedbackDesc.textContent = '현재 수비 위치 찾기 훈련을 진행 중입니다!';
        feedbackToast.className = 'feedback-toast';
        feedbackToast.classList.remove('hidden');
        clearTimeout(feedbackToast._timer);
        feedbackToast._timer = setTimeout(() => {
          feedbackToast.classList.add('hidden');
        }, 2000);
      }
    });
  }

  if (offenseModeBtn) {
    offenseModeBtn.addEventListener('click', () => {
      sfx.playClick();
      if (feedbackToast && feedbackTitle && feedbackDesc) {
        feedbackIcon.textContent = '🏀';
        feedbackTitle.textContent = '공격 모드 준비 중';
        feedbackDesc.textContent = '공격 훈련 기능은 준비 중입니다! 현재는 수비 훈련을 먼저 진행해보세요.';
        feedbackToast.className = 'feedback-toast';
        feedbackToast.classList.remove('hidden');
        clearTimeout(feedbackToast._timer);
        feedbackToast._timer = setTimeout(() => {
          feedbackToast.classList.add('hidden');
        }, 2500);
      }
    });
  }

  ttsSpeakBtn.addEventListener('click', () => {
    sfx.playClick();
    speakCurrentQuizGuide();
  });

  // ================= 초기 실행 =================
  function updateModeBadges() {
    ['1v1', '2v2', '3v3', '5v5'].forEach(m => {
      const badge = document.getElementById(`badge_${m}`);
      if (badge && modeData[m]) {
        badge.textContent = `${modeData[m].length}문제`;
      }
    });
  }
  updateModeBadges();
  initNavChips();
  loadQuiz(0);
});
