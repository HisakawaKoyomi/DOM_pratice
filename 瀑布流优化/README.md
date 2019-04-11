### 使用到的优化技术 

---
  * 图片懒加载，监听滚轮事件到底部再加载图片
  * document.createDocumentFragment( )，文档片段，分批插入节点，减少DOM的操作
  * window.requestAnimationFrame( )，自动控制每批图片插入的时机，防止用户滚动过快而失帧，导致画面不流畅
  * 移动端适用的头部  
  ```html
     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  ```
  
---
### 疑难解决

---
  * 无法获取\<img\> 的offsetWidth
    * 方案一:
     尝试发现 <img>的width属性（不是style.width）可以获取，但width是图片的**实际大小**而不是经页面缩放后的大小。因为宽度写死，所以按比例计算( ele 为 \<li\> 标签 )
      ```javascript
      const height = Math.round(ele.childNodes[0].childNodes[0].height * (WIDTH/ele.childNodes[0].childNodes[0].width)) + marginTop;
      ```
      但此种做法仍会导致有时的布局混乱
     
     * 方案二:
     归根到底是图片未加载完成，代码异步执行导致offsetWidth = 0; 因而为<img> 绑定监听事件
       ```javascript
            ele.childNodes[0].childNodes[0].onload = function () { 
                // code 
            }
       ```  
 _ 
 ---
  * 首屏加载，第二行与第一行的间距不符合预期（过密或过疏）
    * 原因: 及时添加onload，加载完成的顺序不是按照标签插入的顺序来的；因而，高度数组heightArr.push()导致数组元素下标与实际页面从左到右的顺序不一致
    * 解决: 首行图片加载，对于高度数组采用 
    
       ```javascript
          heightArr[order] = height;
       ```
   _
   ---
  * 首屏加载，部分图片重合（与上一个疑问类似）
    * 原因: 同一批图片中，偏后的图片提前加载完毕，定位于顶端。由于偏前的图片位置高度写死在顶端，导致它们重合；不完善的代码如下
      ```javascript
      if (order < col){
          console.log( ele.childNodes[0].childNodes[0].offsetHeight,order);
          ele.style.left = marginLeft + (WIDTH+marginLeft+marginRight) * order + 'px';
          ele.style.top = marginTop + 'px';
          heightArr[order] = height;      
      }else {
          // code
      }
      ```
    * 解决: 事先定义一个长为col,所有值都是0 的高度数组 heightArr
      ```javascript
         const heightArr = Array(col).fill(0);
      ```
      再除去判断，精简代码
      ```javascript
      const index = heightArr.indexOf(Math.min.apply(Math,heightArr));
      ele.style.left = marginLeft + (WIDTH+marginLeft+marginRight)*index + 'px';
      console.log(heightArr,index,order);
      ele.style.top = marginTop + heightArr[index] + 'px';
      heightArr[index] = heightArr[index] + height;
      ```
    * 调试方法:
     通过不断观察每个元素的高度定位，以及console.log(order) 了解图片加载完毕的次序
     
 ---
 注:   
 此处没有使用占位符的原因: 后续图片资源的定位依赖于先前图片的大小、定位；若使用占位符，可能占位图片大小不合要求影响布局