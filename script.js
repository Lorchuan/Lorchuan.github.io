document.addEventListener('DOMContentLoaded', function() {
    // 1. 数据源配置（你们后续可以直接把 Notebook 里的词替换进来）
    let wordData = {
        station: [
            { name: '快捷支付', value: 100 },
            { name: '扫码乘车', value: 80 },
            { name: '人脸识别', value: 60 }
        ],
        hospital: [
            { name: '辅助诊断', value: 100 },
            { name: '医疗建议', value: 90 },
            { name: '提高效率', value: 60 }
        ],
        hawker: [
            { name: '扫码点餐', value: 100 },
            { name: '缺少人情味', value: 85 },
            { name: '怀念人工', value: 60 }
        ],
        community: [
            { name: '年轻人教老人', value: 100 },
            { name: '社区互助', value: 80 },
            { name: '老龄化适应', value: 60 }
        ],
        school: [
            { name: '教学辅助', value: 100 },
            { name: '节约成本', value: 80 },
            { name: '创新思路', value: 60 }
        ]
    };

    const locNames = {
        station: '🚆 车站',
        hospital: '🏥 医院',
        hawker: '🍜 小贩中心',
        community: '🏘️ 社区中心',
        school: '🏫 学校'
    };

    let currentLoc = null;
    let chartDom = document.getElementById('word-cloud-container');
    let myChart = echarts.init(chartDom);

    // 2. 渲染词云的函数
    function renderCloud(locKey) {
        if (!locKey || !wordData[locKey]) return;
        
        document.getElementById('cloud-title').innerText = `${locNames[locKey]} 的专属词云`;
        
        let option = {
            tooltip: { show: true },
            series: [{
                type: 'wordCloud',
                shape: 'circle',
                keepAspect: false,
                left: 'center',
                top: 'center',
                width: '100%',
                height: '100%',
                sizeRange: [16, 55], // 控制字体大小范围
                rotationRange: [-45, 45],
                rotationStep: 45,
                gridSize: 10,
                drawOutOfBound: false,
                textStyle: {
                    color: function () {
                        // 生成偏蓝/紫/绿的现代感颜色
                        const colors = ['#2b6cb0', '#2c5282', '#3182ce', '#38b2ac', '#4fd1c5', '#667eea'];
                        return colors[Math.floor(Math.random() * colors.length)];
                    }
                },
                emphasis: {
                    focus: 'self',
                    textStyle: { textShadowBlur: 8, textShadowColor: 'rgba(0,0,0,0.2)' }
                },
                data: wordData[locKey]
            }]
        };
        myChart.setOption(option);
    }

    // 3. 监听 Icon 悬停事件
    const icons = document.querySelectorAll('.icon-item');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            // 移除所有图标的激活状态
            icons.forEach(i => i.classList.remove('active'));
            // 给当前悬停的图标加上激活状态
            this.classList.add('active');
            
            currentLoc = this.getAttribute('data-loc');
            
            // 同步更新右侧表单的下拉菜单，方便用户直接添加
            document.getElementById('loc-select').value = currentLoc; 
            
            // 渲染词云
            renderCloud(currentLoc);
        });
    });

    // 4. 监听补充关键词功能
    document.getElementById('add-word-btn').addEventListener('click', function() {
        const targetLoc = document.getElementById('loc-select').value;
        const inputEl = document.getElementById('new-word-input');
        const newWord = inputEl.value.trim();

        if (newWord !== '') {
            // 插入新词，给一个较高的初始权重(95)让它显眼
            wordData[targetLoc].push({ name: newWord, value: 95 });
            
            // 如果用户正在看这个地点的词云，立刻刷新让他看到效果
            if (currentLoc === targetLoc) {
                renderCloud(targetLoc);
            }

            // 清理状态并提示
            inputEl.value = '';
            const msg = document.getElementById('success-msg');
            msg.classList.remove('hidden');
            setTimeout(() => { msg.classList.add('hidden'); }, 3000);
        } else {
            alert('请先输入你要补充的观点或词汇哦！');
        }
    });

    // 监听窗口缩放，自适应图表
    window.addEventListener('resize', function() {
        myChart.resize();
    });
});
